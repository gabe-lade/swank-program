/* oh_taxmodel_engine.js -- the Ohio Tax Model's calculation engine (T2).
 *
 * Pure functions, no DOM: the page and the node tests load this same file.
 * Reads the kernel (window.OH_TAXMODEL / kernel.json) and a scenario state and
 * returns every number the page shows. The R reference evaluator
 * (02_code/functions/tool_kernel.R, tool_reference_state) is the parity oracle;
 * test files live in 06_writing/tools/tax-model/tests/.
 *
 * SIGN CONVENTION: every household number is the change in what the household
 * pays; negative = pays less.
 *
 * state = {
 *   v: 1,
 *   cuts: {property, income, sales},        fractions: -1 = end the tax, 0.5 = raise it by half
 *   lever: "cut" | "homestead", homestead_usd,
 *   class_split: null | {c1, c2},           Class I / Class II property cuts
 *   pt: 0..1,                               share of the property-tax change landlords pass to renters
 *   mix: {sales, income, unfunded},         shares of the gap, sum to 1
 *   beh: "none" | "central" | "high",       income behavioral arm (sales household bars never move)
 *   grm: "low" | "central" | "high",        apartment multiple
 *   backfill: 0..1,                         state school backfill (display only)
 *   nr: 0 | 1,                              count the state's credit saving toward the replacement (property cuts only; default 0)
 *   bp: 0 | 0.5 | 1                         share of the business property-tax saving passed to households through prices (default 0)
 * }
 * LINK KEYS: cp, ci, cs (the three cuts), lv, hs, c1, c2, mx, bf, and the five settings pt, bh, gm, nr, bp. A state link (cp/ci/cs) reads all of them through
 * fromQuery; a "?preset=<id>" link reads the five settings through presetFromQuery with the same normalisation (settingsFromQuery), so a link
 * such as ?preset=swap&pt=0.25&bh=high&gm=high&nr=1&bp=0.5 keeps every setting. A missing bh is the typical response.
 * nr and bp are policy/assumption controls added in stage B (D-T3B-4, D-T3B-5). They default to the published convention
 * (0), they do not bump the schema version, and they are inert (no change to any number) when they do not apply.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.OHTM = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var COMPS = ["own_ptax", "rent14_pt1", "rentapt_pt1", "cons", "t0_income", "addon_base"];
  var K6 = COMPS.length;
  var BEH = ["none", "central", "high"];
  var STATE_VERSION = 1;
  // Governments with no income- or sales-tax authority of their own (D-T3-1): property tax is the only local
  // lever they hold. Counties (sales tax), municipalities (income tax) and school districts (SDIT) each have
  // another instrument, so they are not in this list.
  var NO_ALT_LEVELS = ["township", "jvsd", "special_district"];
  var MIDDLE_DECILE = 5;  // "5th of 10 income groups": the middle-income column of the region list (D-T3-33)

  // ---------- small helpers -------------------------------------------------

  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  function packedIndex(i, j) { return (j * (j + 1)) / 2 + i; } // i <= j, column-major upper triangle (R's upper.tri)

  function quadForm(cov, b) {
    var v = 0, i, j;
    for (j = 0; j < K6; j++) {
      v += cov[packedIndex(j, j)] * b[j] * b[j];
      for (i = 0; i < j; i++) v += 2 * cov[packedIndex(i, j)] * b[i] * b[j];
    }
    if (!isFinite(v)) return NaN;   // an infeasible solve puts NaN in b: keep it NaN so the cell is hidden, never a clean zero
    return v > 0 ? v : 0;
  }

  function dot(a, b) { var s = 0, i; for (i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }

  /* Largest-remainder rounding: integer parts of `total` shares that sum to total. */
  function largestRemainder(values, total) {
    var sum = values.reduce(function (a, b) { return a + b; }, 0);
    if (!(sum > 0)) return values.map(function () { return 0; });
    var raw = values.map(function (v) { return (v / sum) * total; });
    var base = raw.map(Math.floor);
    var left = total - base.reduce(function (a, b) { return a + b; }, 0);
    var order = raw.map(function (r, i) { return { i: i, f: r - Math.floor(r) }; })
      .sort(function (a, b) { return b.f - a.f || a.i - b.i; });
    for (var k = 0; k < left; k++) base[order[k].i] += 1;
    return base;
  }

  /* Whole-number percent shares, each rounded half-up from its exact value (D-T3-50). Unlike largest-remainder rounding, a tie
     cannot flip a share that the dollar figure beside it contradicts. The shares sum to 99-101; if half-up leaves the sum outside
     that band, the share nearest to rounding the other way (largest fraction below .5 to round up, smallest fraction at or above
     .5 to round down) moves one point at a time until it is back inside. */
  function sharesHalfUp(values) {
    var sum = values.reduce(function (a, b) { return a + b; }, 0);
    if (!(sum > 0)) return values.map(function () { return 0; });
    var raw = values.map(function (v) { return v / sum * 100; }), out = raw.map(function (r) { return Math.floor(r + 0.5); });
    var tot = function () { return out.reduce(function (a, b) { return a + b; }, 0); }, k, best, n;
    for (n = 0; n < values.length && tot() < 99; n++) {
      best = -1;
      raw.forEach(function (r, i) { if (out[i] <= r && (best < 0 || r - out[i] > raw[best] - out[best])) best = i; });
      if (best < 0) break; out[best] += 1;
    }
    for (n = 0; n < values.length && tot() > 101; n++) {
      best = -1;
      raw.forEach(function (r, i) { if (out[i] >= r && out[i] > 0 && (best < 0 || out[i] - r > out[best] - raw[best])) best = i; });
      if (best < 0) break; out[best] -= 1;
    }
    return out;
  }

  /* Maximum of a unimodal function on [lo, hi] by golden-section search. */
  function argmax(f, lo, hi) {
    var g = (Math.sqrt(5) - 1) / 2, a = lo, b = hi;
    var c = b - g * (b - a), d = a + g * (b - a), fc = f(c), fd = f(d), n;
    for (n = 0; n < 200 && b - a > 1e-14; n++) {
      if (fc > fd) { b = d; d = c; fd = fc; c = b - g * (b - a); fc = f(c); }
      else { a = c; c = d; fc = fd; d = a + g * (b - a); fd = f(d); }
    }
    return (a + b) / 2;
  }

  /* Root of an increasing-then-we-bracket function on [lo, hi] with f(lo) < 0 <= f(hi). */
  function bisect(f, lo, hi) {
    var a = lo, b = hi, m, n;
    for (n = 0; n < 200 && b - a > 1e-15; n++) {
      m = (a + b) / 2;
      if (f(m) < 0) a = m; else b = m;
    }
    return (a + b) / 2;
  }

  // ---------- solvers (ports of the R solvers; see tool_kernel.R) -----------

  /* Revenue from a sales add-on r at the net_state_local identity:
   *   B0 * ((t0 + r) f - t0),  f = ((1 + t0 + r)/(1 + t0))^eps. */
  function salesFactor(r, t0, eps) {
    var f = Math.pow((1 + t0 + r) / (1 + t0), eps);
    return (t0 + r) * f - t0;
  }

  function solveSales(D, B0, t0, eps) {
    if (Math.abs(D) < 1e-6) return { rate: 0, erosion: 0, ok: true };
    var rev = function (r) { return B0 * salesFactor(r, t0, eps); }, r, lo, hi, peak;
    if (D > 0) {
      if (eps === 0) {
        r = D / B0;
      } else {
        hi = -3 * (1 + t0) / eps;
        peak = argmax(rev, 0, hi);
        if (rev(peak) < D) return { rate: NaN, erosion: NaN, ok: false };
        r = bisect(function (x) { return rev(x) - D; }, 0, peak);
      }
    } else {
      lo = -t0 + 1e-9;
      if (eps === 0) {
        r = D / B0;
        if (r < lo) return { rate: NaN, erosion: NaN, ok: false };
      } else {
        if (rev(lo) > D) return { rate: NaN, erosion: NaN, ok: false };
        r = bisect(function (x) { return rev(x) - D; }, lo, 0);
      }
    }
    return { rate: r, erosion: 1 - Math.pow((1 + t0 + r) / (1 + t0), eps), ok: true };
  }

  /* Income add-on solve from the sufficient statistics A (add-on base) and M (marginal liability):
   *   (r A + M) g(r) - M = D,  g = ((1 - mtr - r)/(1 - mtr))^eti. */
  function incomeG(r, mtr, eti) {
    return eti === 0 ? 1 : Math.pow(Math.max((1 - mtr - r) / (1 - mtr), 1e-6), eti);
  }
  function solveIncome(D, A, M, mtr, eti) {
    if (Math.abs(D) < 1e-6) return { rate: 0, ok: true };
    var rev = function (r) { return (r * A + M) * incomeG(r, mtr, eti) - M; }, peak;
    if (eti === 0) {
      var r0 = D / A;
      return { rate: r0, ok: r0 > -mtr };
    }
    if (D < 0) {
      if (rev(-mtr) > D) return { rate: NaN, ok: false };
      return { rate: bisect(function (x) { return rev(x) - D; }, -mtr, 0), ok: true };
    }
    peak = argmax(rev, 0, 1 - mtr - 1e-9);
    if (rev(peak) < D) return { rate: NaN, ok: false };
    return { rate: bisect(function (x) { return rev(x) - D; }, 0, peak), ok: true };
  }

  // ---------- state handling ------------------------------------------------

  var lastKernel = null;   // the kernel most recently handed to defaultState/evaluate: settingsDiff(state) with no kernel argument reads its standard landlord share
  function defaultState(kernel, preset) {
    lastKernel = kernel;
    var s = {
      v: STATE_VERSION,
      cuts: { property: 0, income: 0, sales: 0 },
      lever: "cut", homestead_usd: 0, class_split: null,
      pt: kernel.params.pass_through_arms[kernel.meta.headline_pass_through_arm],
      mix: { sales: 0.5, income: 0.5, unfunded: 0 },
      beh: "none", grm: "central", backfill: 0, nr: 0, bp: 0
    };
    if (preset === "end_property") s.cuts.property = -1;
    else if (preset === "swap") { s.cuts.property = -1; s.mix = { sales: 1, income: 0, unfunded: 0 }; }
    else if (preset === "swap_income") { s.cuts.property = -1; s.mix = { sales: 0, income: 1, unfunded: 0 }; }   // v05: end the property tax, all of it from a higher income tax
    else if (preset === "income_half") { s.cuts.income = -0.5; s.mix = { sales: 1, income: 0, unfunded: 0 }; }
    return s;
  }

  /* The three build steps and the engine's mix (v05 PI sweep). Step 2 is how much of the cut to replace (0 to 1); step 3 is the share of the replaced part raised by sales tax
     (the rest by income tax). mix = { sales: replace x split, income: replace x (1 - split), unfunded: 1 - replace }. mixToSteps is its inverse; `split` is null when nothing
     is replaced (the page then keeps the reader's last split). Any mix, including old three-share links, decodes and re-encodes to the same mix (tested). */
  function stepsToMix(replace, split) { return { sales: replace * split, income: replace * (1 - split), unfunded: 1 - replace }; }
  function mixToSteps(mix) {
    var tot = mix.sales + mix.income;
    return { replace: 1 - mix.unfunded, split: tot > 1e-12 ? mix.sales / tot : null };
  }

  var PRESET_IDS = ["income_half", "end_property", "swap", "swap_income"];   // income_half stays an engine preset (parity tests); the page no longer offers it as a card
  var BP_STEPS = [0, 0.5, 1];
  // The landlord slider's steps (SC-01): the page reads this same constant, so the bracket spans exactly what a reader can set.
  var PT_STEPS = [0, 0.25, 0.5, 0.75, 1];

  function parseQuery(query) {
    var q = {};
    String(query || "").replace(/^\?/, "").split("&").forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf("="), k = decodeURIComponent(i < 0 ? kv : kv.slice(0, i));
      q[k] = i < 0 ? "" : decodeURIComponent(kv.slice(i + 1));
    });
    return q;
  }
  function nrFromLink(v) { return v === "1" || v === 1 || v === true ? 1 : 0; }
  // bp is none / half / all: any other number snaps to the nearest step (a hand-edited link cannot invent a share).
  function snapBp(x) {
    x = +x;
    if (!isFinite(x)) return 0;
    return BP_STEPS.reduce(function (p, c) { return Math.abs(c - x) < Math.abs(p - x) ? c : p; }, 0);
  }
  function bpFromLink(v) { return v == null || v === "" ? 0 : snapBp(v); }

  /* A "?preset=<id>" link (D-T3-17). null when the link has no preset parameter; { id, ok: false } for an id the page
     does not know (the page says so out loud); { id, ok: true, state } with the same state the card gives. */
  function presetFromQuery(kernel, query) {
    var m = /(?:^|[?&])preset=([^&]*)/.exec(String(query || ""));
    if (!m) return null;
    var id = decodeURIComponent(m[1]);
    if (PRESET_IDS.indexOf(id) < 0) return { id: id, ok: false };
    var state = defaultState(kernel, id), q = parseQuery(query);
    // A preset link may carry every setting a reader can change (pt, bh, gm, nr, bp), read exactly as fromQuery reads them (G6): none is dropped silently.
    Object.assign(state, settingsFromQuery(q, state));
    return { id: id, ok: true, state: state };
  }

  /* Which side(s) of the zero line a chart needs (D-T3-20). `values` are signed bar extents; zeros, nulls and NaN
     (no bar is drawn for them) are ignored. "neg": every bar goes left, so the axis sits at the right edge and the bars
     use the full width. "pos": the mirror image. "both": mixed signs, or no bars at all. */
  function axisSides(values) {
    var neg = false, pos = false;
    (values || []).forEach(function (v) { if (typeof v === "number" && isFinite(v)) { if (v < 0) neg = true; else if (v > 0) pos = true; } });
    return neg && !pos ? "neg" : pos && !neg ? "pos" : "both";
  }

  function normalize(kernel, st) {
    var s = clone(st), d = defaultState(kernel), snapped = false;
    s.v = STATE_VERSION;
    s.cuts = { property: +(st.cuts && st.cuts.property) || 0, income: +(st.cuts && st.cuts.income) || 0, sales: +(st.cuts && st.cuts.sales) || 0 };
    s.lever = st.lever === "homestead" ? "homestead" : "cut";
    s.homestead_usd = +st.homestead_usd || 0;
    if (s.lever === "homestead") { // the grid is on $5,000 steps and is never interpolated: snap, and say so
      var xs = kernel.statewide.homestead.map(function (g) { return g.exemption_usd; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
      var near = xs.reduce(function (p, c) { return Math.abs(c - s.homestead_usd) < Math.abs(p - s.homestead_usd) ? c : p; }, xs[0]);
      if (near !== s.homestead_usd) { s.homestead_usd = near; snapped = true; }
    }
    s.class_split = st.class_split ? { c1: +st.class_split.c1, c2: +st.class_split.c2 } : null;
    s.pt = st.pt == null ? d.pt : +st.pt;
    s.mix = st.mix ? { sales: +st.mix.sales, income: +st.mix.income, unfunded: +st.mix.unfunded } : d.mix;
    var mixOk = [s.mix.sales, s.mix.income, s.mix.unfunded].every(function (x) { return isFinite(x) && x >= 0 && x <= 1; }) &&
      Math.abs(s.mix.sales + s.mix.income + s.mix.unfunded - 1) < 1e-9;
    s._flags = snapped ? ["homestead_snapped_to_grid"] : [];
    if (!mixOk) { s.mix = { sales: d.mix.sales, income: d.mix.income, unfunded: d.mix.unfunded }; s._flags.push("mix_reset_to_default"); }
    // A tax that is being changed never also pays for itself: move its share to the other instrument
    // (or to "unfunded" when both are being changed).
    if (s.cuts.income !== 0 && s.mix.income > 0) {
      if (s.cuts.sales !== 0) s.mix.unfunded += s.mix.income; else s.mix.sales += s.mix.income;
      s.mix.income = 0; s._flags.push("self_share_moved");
    }
    if (s.cuts.sales !== 0 && s.mix.sales > 0) {
      if (s.cuts.income !== 0) s.mix.unfunded += s.mix.sales; else s.mix.income += s.mix.sales;
      s.mix.sales = 0; s._flags.push("self_share_moved");
    }
    s.beh = BEH.indexOf(st.beh) >= 0 ? st.beh : "none";
    s.grm = ["low", "central", "high"].indexOf(st.grm) >= 0 ? st.grm : "central";
    s.backfill = +st.backfill || 0;
    s.nr = st.nr === 1 || st.nr === true || st.nr === "1" ? 1 : 0;
    s.bp = st.bp == null ? 0 : snapBp(st.bp);
    return s;
  }

  // ---------- evaluation ----------------------------------------------------

  function cellMode(mean, se, samp, rule) {
    if (samp < rule.min_sampled) return "hidden";
    if (!isFinite(mean) || !isFinite(se)) return "hidden";   // infeasible solve: print nothing rather than $NaN
    if (se === 0) return "number"; // exactly no change (e.g., no tax is changed): a clean zero
    if (Math.abs(mean) > 0 && se / Math.abs(mean) < rule.max_se_over_mean) return "number";
    if (Math.abs(mean) < rule.interval_z * se) return "about_even";
    return "range"; // the sign is clear, the size is not: print "between $lo and $hi" (D-T3-10)
  }

  // Bounds of a "range" cell: |mean| -/+ z x SE, each to the nearest range_round_usd. floor(x + 0.5) so the
  // browser and the R reference agree on ties. null outside the range mode.
  function rangeBound(mean, se, mode, rule, sign) {
    if (mode !== "range") return null;
    var step = rule.range_round_usd;
    return Math.floor((Math.abs(mean) + sign * rule.interval_z * se) / step + 0.5) * step;
  }
  // For the page: the same bounds from a cell's mean and SE (null unless the cell is in range mode).
  function rangeOf(mean, se, rule) {
    var m = cellMode(mean, se, Infinity, rule);
    return m === "range" ? { lo: rangeBound(mean, se, m, rule, -1), hi: rangeBound(mean, se, m, rule, 1) } : null;
  }
  // The words for a range cell. A low end that rounds to $0 reads "up to $hi", not "between $0 and $hi".
  function rangeWords(mean, se, rule) {
    var r = rangeOf(mean, se, rule);
    if (!r) return null;
    var usd = function (x) { return "$" + x.toLocaleString("en-US"); }, dir = mean < 0 ? " less" : " more";
    return (r.lo === 0 ? "up to " + usd(r.hi) : "between " + usd(r.lo) + " and " + usd(r.hi)) + dir;
  }

  function evaluate(kernel, state) {
    lastKernel = kernel;
    var P = kernel.params, st = normalize(kernel, state), rule = kernel.meta.display_rule;
    var flags = st._flags.slice();
    delete st._flags;
    var homestead = st.lever === "homestead";
    var c1 = st.class_split ? st.class_split.c1 : st.cuts.property;
    var c2 = st.class_split ? st.class_split.c2 : st.cuts.property;

    // --- Step 1 revenue ---
    var revP, hsRows = null, hsSaving = null;
    if (homestead) {
      var grid = kernel.statewide.homestead;
      var sameX = grid.filter(function (g) { return g.exemption_usd === st.homestead_usd; });
      if (!sameX.length) {
        var xs = grid.map(function (g) { return g.exemption_usd; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
        var best = xs.reduce(function (p, c) { return Math.abs(c - st.homestead_usd) < Math.abs(p - st.homestead_usd) ? c : p; }, xs[0]);
        flags.push("homestead_snapped_to_grid");
        st.homestead_usd = best;
        sameX = grid.filter(function (g) { return g.exemption_usd === best; });
      }
      hsRows = sameX;
      revP = -sameX.filter(function (g) { return g.decile === 0; })[0].saving_total_usd;
      hsSaving = {};
      sameX.forEach(function (g) { if (g.decile >= 1) hsSaving[g.decile] = g.mean_saving_per_owner_usd; });
    } else {
      revP = c1 * P.class1_usd + c2 * P.class2_usd;
    }
    var revI = st.cuts.income * P.state_income_collections;
    var revS = st.cuts.sales * P.state_sales_collections;
    var gap = -(revP + revI + revS);

    // --- Step 2 rates ---
    // One solver for the gap as printed and for the gap net of the state's reimbursement (D-T3-25): the same mix,
    // the same floors, the same arms, so the netted rates are the engine's own solve and not a hand factor.
    var floorS = -P.state_sales_rate, B0 = P.sales_base, t0 = P.t0_sales;
    function solveStep2(gapX, f) {
      var Ds = st.mix.sales * gapX, Di = st.mix.income * gapX, salesArms = {}, incomeArms = {};
      BEH.forEach(function (arm) {
        var s = solveSales(Ds, B0, t0, P.eps[arm]);
        if (Ds < 0 && (!s.ok || s.rate < floorS)) { f && f.indexOf("sales_floor_binding") < 0 && f.push("sales_floor_binding"); }
        if (Ds < 0 && (!s.ok || s.rate < floorS)) s = { rate: floorS, erosion: 1 - Math.pow((1 + t0 + floorS) / (1 + t0), P.eps[arm]), ok: true };
        salesArms[arm] = s;
        var inc = solveIncome(Di, P.A_all, P.M_all, P.mtr, P.eti[arm]);
        if (Di < 0 && (!inc.ok || inc.rate < -P.mtr)) { inc = { rate: -P.mtr, ok: true }; f && f.indexOf("income_floor_binding") < 0 && f.push("income_floor_binding"); }
        inc.g = inc.ok ? incomeG(inc.rate, P.mtr, P.eti[arm]) : NaN;
        inc.achieved = inc.ok ? (inc.rate * P.A_all + P.M_all) * inc.g - P.M_all : NaN;
        incomeArms[arm] = inc;
      });
      var rStatic = Math.max(Ds / B0, floorS), ibx = incomeArms[st.beh], ach = rStatic * B0;
      return { salesArms: salesArms, incomeArms: incomeArms, rStaticS: rStatic, ib: ibx, achS: ach,
               unpaid: gapX - (ach + (ibx.ok ? ibx.achieved : 0)) };
    }
    // Credit saving (D-T3B-4). Ending the property tax also ends the state's reimbursement of part of homeowners' bills. It only exists
    // for a property-tax cut with a gap to fill. `gap` stays the gross figure the page and the published scalars use; `target` is what
    // the replacement taxes are asked to raise: the gap, or the gap less the credit saving when the reader counts it (nr = 1).
    var DD = kernel.statewide.decomposition;
    var rUsd = (!homestead && c1 < 0 && gap > 0) ? -c1 * DD.state_reimbursement : 0;
    var nrApplies = rUsd > 0, nrOn = st.nr === 1 && nrApplies;
    if (st.nr === 1 && !nrApplies) flags.push("nr_inert");
    var target = nrOn ? gap - rUsd : gap;
    // Both solves are always available, so "instead of" lines are a lookup and the identities can be tested on either.
    var gS = solveStep2(gap, nrOn ? null : flags), nS = nrApplies ? solveStep2(gap - rUsd, nrOn ? flags : null) : null;
    var step2 = nrOn ? nS : gS;
    var salesArms = step2.salesArms, incomeArms = step2.incomeArms, rStaticS = step2.rStaticS, ib = step2.ib, achS = step2.achS;
    var cutDeltaS = st.cuts.sales * P.state_sales_rate; // a state sales cut lowers the combined rate by this much
    var unpaid = step2.unpaid;
    function ratesOf(sol) {
      return { sales: { static_after: t0 + cutDeltaS + sol.rStaticS, central_after: t0 + cutDeltaS + sol.salesArms.central.rate, high_after: t0 + cutDeltaS + sol.salesArms.high.rate },
               income: { static_after: P.mtr + sol.incomeArms.none.rate, central_after: P.mtr + sol.incomeArms.central.rate, high_after: P.mtr + sol.incomeArms.high.rate } };
    }
    function solveOut(sol, tgt) { var o = ratesOf(sol); o.target_usd = tgt; o.unpaid_usd = sol.unpaid; return o; }
    if (!salesArms.central.ok || !salesArms.high.ok) flags.push("sales_rate_infeasible");
    if (!ib.ok) flags.push("income_rate_infeasible");

    // --- household coefficients ---
    var grmScale = P.apt_full_usd[st.grm === "central" ? "central" : st.grm + "_grm"] / P.apt_full_usd.central;
    // Business property-tax pass-through (D-T3B-5): a share of the business property-tax SAVING reaches households through prices, in
    // proportion to the taxable consumption the sales leg already uses (component index 3), over the sales leg's own key B0. So the
    // coefficient is exact in every cell's covariance, the resident share (consHh / B0) is what households carry, and the rest
    // stays in the omissions. Only a business property-tax cut has a saving to pass on (raises and the homestead lever: inert).
    var boUsd = homestead ? 0 : c2 * (P.class2_usd - DD.apartments_full_usd[st.grm === "central" ? "central" : st.grm + "_grm"]);   // = business_other (negative for a cut)
    var bpApplies = !homestead && boUsd < 0, bpEff = bpApplies ? st.bp : 0;
    if (st.bp > 0 && !bpApplies) flags.push("bp_inert");
    var bpCoef = bpEff * boUsd / B0;
    var b1 = homestead
      ? [0, 0, 0, st.cuts.sales * P.state_sales_rate, st.cuts.income, 0]
      : [c1, c1 * st.pt, c2 * st.pt * grmScale, st.cuts.sales * P.state_sales_rate + bpCoef, st.cuts.income, 0];
    var b2 = [0, 0, 0, achS / B0, 0, ib.ok ? ib.rate * ib.g : NaN];
    var bn = b1.map(function (v, i) { return v + b2[i]; });

    function cellOut(c, keyed) {
      var n = c.n, m1 = dot(c.s, b1) / n, m2 = dot(c.s, b2) / n;
      if (homestead && c.t === "o" && keyed && keyed.decile != null) m1 += -hsSaving[keyed.decile];
      else if (homestead && c.t === "o" && keyed && keyed.all) m1 += -hsAllOwner;   // statewide owners: household-weighted mean of the decile savings
      var net = m1 + m2, se = Math.sqrt(quadForm(c.cov, bn));
      // Step 1 ("before paying") has its own standard error and display mode: its coefficients are b1 only, so
      // it must not inherit the net cell's mode (a near-zero NET change would otherwise hide a large Step 1 one).
      var se1 = Math.sqrt(quadForm(c.cov, b1));
      // The cell's current property-tax bill (D-T3B-2): its Step 1 base at a 100% property cut. Owners: the own bill; renters: the rent
      // components at the pass-through and apartment multiple set. A group average, never one household's bill.
      var bill = (c.s[0] + st.pt * c.s[1] + st.pt * grmScale * c.s[2]) / n;
      // Household P25/P75 of the current property-tax bill (kernel `p`: owners' own bill; renters' full embedded amount at 100% pass-through).
      var pi = c.t === "o" ? 0 : 2, p25 = c.p && c.p[pi] != null ? c.p[pi] : null, p75 = c.p && c.p[pi + 1] != null ? c.p[pi + 1] : null;
      // Of the Step 1 mean, the part that is lower prices from business property-tax savings passed on (bp > 0); the rest is the cell's own property-tax change.
      var bpPart = bpCoef * c.s[3] / n + 0;   // + 0 turns -0 into 0
      var out = { households: n, sampled: c.samp, bill_p25_usd: p25, bill_p75_usd: p75, mean_step1: m1, mean_step1_prices: bpPart, mean_step2: m2, mean: net, se: se, tenure: c.t, current_bill_usd: bill,
                  mode: cellMode(net, se, c.samp, rule), se_step1: se1, mode_step1: cellMode(m1, se1, c.samp, rule) };
      out.lo = rangeBound(net, se, out.mode, rule, -1); out.hi = rangeBound(net, se, out.mode, rule, 1);
      out.lo_step1 = rangeBound(m1, se1, out.mode_step1, rule, -1); out.hi_step1 = rangeBound(m1, se1, out.mode_step1, rule, 1);
      return out;
    }
    // Household-weighted mean homestead saving per owner across the ten decile cells (for the statewide owner cell).
    var hsAllOwner = 0;
    if (homestead) {
      var hn = 0;
      kernel.cells.decile_tenure.forEach(function (c) { if (c.t === "o") { hsAllOwner += c.n * hsSaving[c.decile]; hn += c.n; } });
      hsAllOwner /= hn;
    }
    function build(list, keys, allowHomestead, all) {
      return list.map(function (c) {
        var key = {}; keys.forEach(function (k) { key[k] = c[k]; });
        if (all) key.all = true;
        var o = cellOut(c, allowHomestead ? key : { decile: null });
        keys.forEach(function (k) { o[k] = c[k]; });
        return o;
      });
    }
    var cells = {
      decile_tenure: build(kernel.cells.decile_tenure, ["decile"], true),
      tenure: build(kernel.cells.tenure, [], true, true),
      region_tenure: homestead ? null : build(kernel.cells.region_tenure, ["region_id"], false),
      region_tenure_decile: homestead ? null : build(kernel.cells.region_tenure_decile, ["region_id", "decile"], false)
    };
    if (homestead) { flags.push("regions_unavailable_for_homestead"); flags.push("homestead_se_excludes_saving"); }

    // --- Step 1 displays ---
    var levels = kernel.statewide.level_class.map(function (r) {
      return { level: r.level, change_usd: homestead ? null : c1 * r.c1 + c2 * r.c2, base_usd: r.c1 + r.c2 };
    });
    var shares = homestead ? null : largestRemainder(levels.map(function (r) { return Math.abs(r.change_usd); }), 100);
    if (shares) levels.forEach(function (r, i) { r.per_100 = shares[i]; });
    var noAlt = homestead ? null : levels.reduce(function (a, r) {
      return NO_ALT_LEVELS.indexOf(r.level) >= 0 ? a + r.change_usd : a;
    }, 0);
    var D = kernel.statewide.decomposition, aptFull = D.apartments_full_usd[st.grm === "central" ? "central" : st.grm + "_grm"];
    var decomposition = homestead
      ? [{ piece: "owner_occupants", usd: revP }]
      : [
        { piece: "owner_occupants", usd: c1 * D.owner_occupants },
        { piece: "renters_1to4", usd: c1 * st.pt * D.rent14_full },
        { piece: "landlords_1to4", usd: c1 * (1 - st.pt) * D.rent14_full },
        { piece: "renters_apartments", usd: c2 * st.pt * aptFull },
        { piece: "landlords_apartments", usd: c2 * (1 - st.pt) * aptFull },
        { piece: "state_reimbursement", usd: c1 * D.state_reimbursement },
        { piece: "class1_other", usd: c1 * (P.class1_usd - D.owner_occupants - D.rent14_full - D.state_reimbursement) },
        { piece: "business_other", usd: c2 * (P.class2_usd - aptFull) }
      ];

    // Disclosure (D-T3-14), not an offset: ending a property tax also ends the state's reimbursement of part of
    // homeowners' bills. The published model replaces the full net charged, so the gap does not net this out; the
    // page says what the gap would be if it were counted. Only for a property-tax cut (a raise or a non-property
    // tax has no reimbursement to stop, and the homestead lever is not in v1).
    var reimb = null;
    if (nrApplies) {
      // netted: the rate tiles and the unpaid amount re-solved at gap - credit saving, same mix and arms (D-T3-25). Always the NETTED
      // solve and always against the GROSS unpaid, whichever setting is live, so the disclosure reads the same either way; `counted`
      // says whether the live numbers are the netted ones.
      var nr_ = ratesOf(nS);
      reimb = { usd: rUsd, share_of_gap: rUsd / gap, counted: nrOn,
        netted: { gap_usd: gap - rUsd, unpaid_usd: nS.unpaid, unpaid_smaller_usd: gS.unpaid - nS.unpaid, sales: nr_.sales, income: nr_.income } };
    }

    // --- Step 2 county series (fiscal; never a household number) ---
    var cr = kernel.counties, ix = {};
    cr.columns.forEach(function (c, i) { ix[c] = i; });
    var sumSales = 0, sumInc = 0;
    cr.rows.forEach(function (r) { sumSales += r[ix.sales_base]; sumInc += r[ix.income_liability]; });
    var countySeries = cr.rows.map(function (r) {
      var lost = 0, lvlc = {};
      kernel.statewide.level_class.forEach(function (lc) {
        var a = r[ix[lc.level + "|1"]], b = r[ix[lc.level + "|2"]];
        lvlc[lc.level] = homestead ? null : c1 * a + c2 * b;
        if (!homestead) lost += c1 * a + c2 * b;
      });
      return {
        county_fips: r[ix.county_fips], county_name: r[ix.county_name], region_id: r[ix.region_id],
        property_change_usd: homestead ? null : lost, by_level_usd: lvlc, enrollment: r[ix.enrollment],
        // Two different geographies, never added: sales by PLACE OF SALE (county sales base), income by COUNTY OF
        // RESIDENCE (total TY2023 liability, which allocates the add-on only approximately).
        sales_collected_usd: achS * (r[ix.sales_base] / sumSales),
        income_collected_usd: (ib.ok ? ib.achieved : 0) * (r[ix.income_liability] / sumInc)
      };
    });

    var incomeHh = 0, consHh = 0, addonHh = 0, hhCount = 0;
    kernel.cells.decile_tenure.forEach(function (c) { incomeHh += c.s[4]; consHh += c.s[3]; addonHh += c.s[5]; hhCount += c.n; });
    var totals = { step1_usd: 0, step2_usd: 0, net_usd: 0 };
    cells.decile_tenure.forEach(function (c) {
      totals.step1_usd += c.households * c.mean_step1; totals.step2_usd += c.households * c.mean_step2; totals.net_usd += c.households * c.mean;
    });

    var regions = cells.region_tenure ? cells.region_tenure.slice().sort(function (a, b) { return a.mean - b.mean; }) : null;

    // Middle-income cells for the region list (D-T3-33): the kernel's own region x tenure x income-group cells for the 5th of 10
    // income groups, each with its own SE and display mode. Nothing is averaged across income groups (no cross-covariance).
    var regionsMiddle = cells.region_tenure_decile ? { decile: MIDDLE_DECILE, cells: kernel.regions.map(function (rg) {
      var pick = function (t) { return cells.region_tenure_decile.filter(function (c) { return c.region_id === rg.region_id && c.decile === MIDDLE_DECILE && c.tenure === t; })[0] || null; };
      return { region_id: rg.region_id, owner: pick("o"), renter: pick("r") };
    }) } : null;

    // What sits between the Step 1 household bars and the revenue change (D-T3-36), signed like the revenue change. The pieces
    // are business property, farm and other land, the state's credits, and the share landlords keep (which scales with the
    // pass-through setting); for income and sales changes the part no resident household is credited with. bars + pieces = revenue.
    var oPieces = [], passedResident = 0;
    if (!homestead) {
      var dsum = function (names) { return decomposition.filter(function (p) { return names.indexOf(p.piece) >= 0; }).reduce(function (a, p) { return a + p.usd; }, 0); };
      // With the pass-through on, the resident share of the passed saving is IN the bars (it moved out of this list into
      // `included_by_assumption`); what stays here is the part owners keep plus the passed part that leaves Ohio households.
      passedResident = bpEff * boUsd * consHh / B0;
      oPieces.push({ key: "business_property", usd: dsum(["business_other"]) - passedResident }, { key: "farm_other_land", usd: dsum(["class1_other"]) },
        { key: "state_credits", usd: dsum(["state_reimbursement"]) }, { key: "landlords_kept", usd: dsum(["landlords_1to4", "landlords_apartments"]) });
      oPieces.push({ key: "not_attributed", usd: revI - st.cuts.income * incomeHh + (revS - st.cuts.sales * P.state_sales_rate * consHh) });
    }
    // bars_usd (which already contains every included_by_assumption piece) + listed_usd = the revenue change, at every control setting.
    var omissions = { bars_usd: totals.step1_usd, pieces: oPieces, listed_usd: oPieces.reduce(function (a, p) { return a + p.usd; }, 0),
      included_by_assumption: bpEff > 0 ? [{ key: "business_property_passed", usd: passedResident, passed_share: bpEff, resident_share: consHh / B0 }] : [] };

    // Statewide reference cells for the region list (D-T3-43). Middle-income: the kernel's own decile-5 cells (same objects as
    // cells.decile_tenure, own SE and mode). All incomes: the kernel's statewide tenure cells (D-T3B-8), each with its own replicate
    // SE, so nothing is pooled here and no SE bound is needed.
    var midPick = function (t) { return cells.decile_tenure.filter(function (c) { return c.decile === MIDDLE_DECILE && c.tenure === t; })[0]; };
    var statewide = { decile: MIDDLE_DECILE, all: { owner: cells.tenure.filter(function (c) { return c.tenure === "o"; })[0], renter: cells.tenure.filter(function (c) { return c.tenure === "r"; })[0] }, middle: { owner: midPick("o"), renter: midPick("r") } };

    // Step 2's side of the accounting (D-T3-46): what the new (or, for a give-back, the lowered) taxes bring in minus what resident
    // households are charged. Sales: households carry achS x (their consumption base / B0). Income: households carry rate x g on the
    // add-on base. The rest is non-residents, visitors, trusts and others. Signed like the allocation.
    var achI = ib.ok ? ib.achieved : 0;
    var residual2 = { sales: achS - achS * consHh / B0, income: ib.ok && st.mix.income > 0 ? achI - ib.rate * ib.g * addonHh : 0 };

    return {
      state: st,
      gap_usd: gap, target_usd: target, credit_saving_usd: nrOn ? rUsd : 0, balanced: Math.abs(unpaid) < 1, unpaid_usd: unpaid,
      controls: {
        nr: { requested: st.nr, applies: nrApplies, counted: nrOn, inert: st.nr === 1 && !nrApplies, credit_saving_usd: rUsd },
        bp: { requested: st.bp, applies: bpApplies, passed_share: bpEff, inert: st.bp > 0 && !bpApplies, business_saving_usd: -boUsd,
              resident_share: consHh / B0, passed_to_households_usd: -passedResident }
      },
      revenue_change_usd: { property: revP, income: revI, sales: revS },
      sales: { before: t0, static_after: t0 + cutDeltaS + rStaticS, central_after: t0 + cutDeltaS + salesArms.central.rate, high_after: t0 + cutDeltaS + salesArms.high.rate,
               erosion_central: salesArms.central.erosion, erosion_high: salesArms.high.erosion, alloc_usd: achS },
      income: { before: P.mtr, static_after: P.mtr + incomeArms.none.rate, central_after: P.mtr + incomeArms.central.rate,
                high_after: P.mtr + incomeArms.high.rate, alloc_usd: ib.ok ? ib.achieved : NaN },
      totals: totals,
      step1: { revenue_change_usd: revP + revI + revS, levels: levels, decomposition: decomposition, omissions: omissions,
               // Property tax change at townships, JVSDs and special districts (signed like levels[].change_usd).
               no_alternative_authority_usd: noAlt,
               // Revenue change (state collections) minus what resident households are credited with: nonresidents,
               // trusts, pass-through entities, use tax and timing. Reported, never hidden.
               residual_usd: { income: revI - st.cuts.income * incomeHh, sales: revS - st.cuts.sales * P.state_sales_rate * consHh } },
      step2: { state_reimbursement: reimb,
               // Both solves of the replacement (D-T3B-4): `live` names the one every other number on the result uses; `other_setting` is the
               // solve for the other value of nr (null when nr is inert), for "instead of" lines. Rates and unpaid only.
               solves: { gross: solveOut(gS, gap), netted: nS ? solveOut(nS, gap - rUsd) : null }, live: nrOn ? "netted" : "gross",
               other_setting: nrApplies ? Object.assign({ nr: nrOn ? 0 : 1 }, solveOut(nrOn ? gS : nS, nrOn ? gap : gap - rUsd)) : null,
               alloc_usd: { sales: achS, income: ib.ok ? ib.achieved : NaN }, residual_usd: residual2,
               // What the new (or lowered) taxes bring in, signed like the target: raised + unpaid = target (tested). The page prints this, never the target, as "raised".
               raised_usd: achS + (ib.ok ? ib.achieved : 0),
               unfunded_chosen_usd: st.mix.unfunded * target, unfunded_shortfall_usd: unpaid - st.mix.unfunded * target,
               unpaid_usd: unpaid, unpaid_per_hh_usd: unpaid / hhCount },
      cells: cells, regions: regions, regions_middle: regionsMiddle, statewide: statewide, counties: countySeries, flags: flags,
      coef: { b1: b1, b2: b2 }   // the Step 1 and Step 2 coefficients on the six cell components, for roughEstimate (v05)
    };
  }

  /* "Your rough estimate" (v05, PI 2026-11-12): one household in one county, from a home value (owners) or a monthly rent (renters). It replaces the county-scaled
     averages, which double counted income. The survey averages are never rescaled by county; this is a separate, typical-levy estimate.
       owner   property tax saved = value x 0.35 x the county's residential rate (net charged / taxable value, TY2025, before the state's credits) x the model's owner
               multiplier k / (1 + relief gross-up), the same owner treatment the household averages use (HB 186 schedule for 2029)
       renter  property tax in rent = 12 x monthly rent x share x the landlord pass-through setting. Two building types, as in the model: a house, duplex or small building
               (up to 4 units, input.building "s"): share = p2r x the renter imputation rate x (county rate / state rate); an apartment building (5 or more units, "a", the
               default): share = the apartment gross rent multiple x the apartment rate (Lincoln Institute Columbus apartment rate, PI 2026-11-23) rescaled by county
               Class II rate / state Class II rate, times the apartment-multiple setting. The small-building p2r is hedonic value / annual CONTRACT rent (2026-11-23)
       new taxes   the average added sales and income tax (and any business-savings price effect) of the income range and tenure in the county's REGION cell, at the
                   page's current response settings; a part of the change left unpaid is not charged to anyone, as in the averages. When that region cell is
                   suppressed (too few surveyed households, the page's own rule) the statewide cell for the same range and tenure stands in, and `fallback` says so
     `res` is evaluate(kernel, state); `rate` is the county-rate bundle; input = { tenure, decile, fips, amount }. net_usd > 0 means pays more. Returns null for the homestead lever,
     an unknown county, a bad amount, or a scenario that does not change the property tax. */
  var ESTIMATE_RANGE = { o: { min: 25000, max: 2000000 }, r: { min: 200, max: 5000 } };
  function parseAmount(str, tenure) {
    var rg = ESTIMATE_RANGE[tenure], t = String(str == null ? "" : str).replace(/[$\s]/g, ""), what = tenure === "o" ? "a home value" : "a monthly rent";
    if (!t) return { ok: false, empty: true, msg: "Enter " + what };
    var m = t.match(/^([0-9,]*\.?[0-9]*)([kKmM]?)$/);
    if (!m || !/[0-9]/.test(m[1])) return { ok: false, msg: "Enter " + what + " in dollars, like " + (tenure === "o" ? "250,000" : "1,200") };
    if (m[1].indexOf(",") >= 0 && !/^[0-9]{1,3}(,[0-9]{3})+(\.[0-9]*)?$/.test(m[1])) return { ok: false, msg: "Check the commas in that number" };
    var n = parseFloat(m[1].replace(/,/g, ""));
    if (m[2]) n *= /k/i.test(m[2]) ? 1e3 : 1e6;
    var f = function (x) { return "$" + x.toLocaleString("en-US"); };
    if (!isFinite(n) || n < rg.min) return { ok: false, msg: "Enter " + what + " of at least " + f(rg.min) };
    if (n > rg.max) return { ok: false, msg: "This estimate covers " + what.replace("a ", "") + "s up to " + f(rg.max) };
    return { ok: true, value: n };
  }
  function roughEstimate(kernel, res, rate, input) {
    if (!res || !res.coef || !rate || !input || !res.cells.region_tenure_decile) return null;
    var st = res.state, c1 = st.class_split ? st.class_split.c1 : st.cuts.property;
    // Apartments (5+ units) are Class II, so they take the Class II cut when the classes are split (review 2026-11-20).
    var aptIn = input.tenure === "r" && input.building !== "s", cut = aptIn && st.class_split ? st.class_split.c2 : c1;
    // Cuts only (review 2026-11-20): a raise flips every line's sign and the panel's words describe a saving.
    if (st.lever === "homestead" || !(cut < 0)) return null;
    var rg = ESTIMATE_RANGE[input.tenure], v = +input.amount;
    if (!rg || !isFinite(v) || v < rg.min || v > rg.max) return null;
    var cty = rate.counties.filter(function (x) { return x.fips === input.fips; })[0];
    var cell = cty && res.cells.region_tenure_decile.filter(function (x) { return x.region_id === cty.region_id && x.tenure === input.tenure && x.decile === input.decile; })[0];
    if (!cell) return null;
    var fallback = cell.mode === "hidden";
    if (fallback) cell = res.cells.decile_tenure.filter(function (x) { return x.tenure === input.tenure && x.decile === input.decile; })[0];
    var base, share = null, mult = null;
    if (input.tenure === "o") { mult = rate.meta.owner.multiplier; base = v * cty.rate_market * mult; }
    else {
      var apt = input.building !== "s", gs = kernel.params.apt_full_usd[st.grm === "central" ? "central" : st.grm + "_grm"] / kernel.params.apt_full_usd.central;
      share = apt ? rate.meta.apartment.grm * (rate.meta.apartment.apartment_rate || rate.meta.apartment.state_rate_market) * (cty.rate_market_c2 / rate.meta.apartment.state_rate_market) * gs
                  : rate.meta.renter.p2r * rate.meta.renter.imputation_rate * (cty.rate_market / rate.meta.state_rate_market);
      base = 12 * v * share * st.pt;
    }
    var saved = -cut * base, newTaxes = cell.mean_step2, prices = cell.mean_step1_prices;
    return { county: cty.name, region_id: cty.region_id, tenure: input.tenure, saved_usd: saved, new_taxes_usd: newTaxes, prices_usd: prices,
             net_usd: newTaxes + prices - saved, fallback: fallback, building: input.tenure === "r" ? (input.building !== "s" ? "a" : "s") : null, rate_market: cty.rate_market, rate_mills: cty.rate_mills, owner_multiplier: mult, renter_share: share };
  }

  // ---------- links, stamp --------------------------------------------------

  function toQuery(state) {
    var s = state, q = [];
    function add(k, v) { q.push(k + "=" + encodeURIComponent(String(v))); }
    add("v", s.v == null ? STATE_VERSION : s.v);
    add("cp", s.cuts.property); add("ci", s.cuts.income); add("cs", s.cuts.sales);
    add("lv", s.lever === "homestead" ? "h" : "c");
    if (s.lever === "homestead") add("hs", s.homestead_usd);
    if (s.class_split) { add("c1", s.class_split.c1); add("c2", s.class_split.c2); }
    add("pt", s.pt);
    add("mx", [s.mix.sales, s.mix.income, s.mix.unfunded].join(","));
    add("bh", s.beh); add("gm", s.grm); add("bf", s.backfill);
    add("nr", s.nr ? 1 : 0); add("bp", s.bp == null ? 0 : s.bp);   // always written (D-T3B-6); an old link without them loads with both off
    return q.join("&");
  }

  // The page labels the response "Typical" / "Strong"; the link value for strong is `high`. Accept the labels too (R1-11).
  var BEH_ALIAS = { strong: "high", typical: "central" };
  function behFromLink(v) { return BEH_ALIAS[v] || v; }

  /* The five settings a link may carry, read one way for every kind of link: the landlord share (pt, clamped to 0-1), the response (bh; a missing or
     unreadable value is the typical response), the apartment multiple (gm), the credit saving (nr) and business pass-through (bp, snapped to a step). */
  function settingsFromQuery(q, d) {
    var pt = q.pt != null && q.pt !== "" && isFinite(+q.pt) ? +q.pt : d.pt;
    return {
      pt: Math.min(1, Math.max(0, pt)),
      beh: BEH.indexOf(behFromLink(q.bh)) >= 0 ? behFromLink(q.bh) : "central",
      grm: ["low", "central", "high"].indexOf(q.gm) >= 0 ? q.gm : "central",
      nr: nrFromLink(q.nr), bp: bpFromLink(q.bp)
    };
  }

  function fromQuery(kernel, query) {
    var q = parseQuery(query), d = defaultState(kernel);
    var num = function (k, dflt) { return q[k] != null && q[k] !== "" && isFinite(+q[k]) ? +q[k] : dflt; };
    var clampN = function (x, lo, hi) { return Math.min(hi, Math.max(lo, x)); };
    var mix = d.mix;
    if (q.mx) {
      var p = q.mx.split(",").map(Number);
      if (p.length === 3 && p.every(isFinite) && Math.abs(p[0] + p[1] + p[2] - 1) < 1e-9) mix = { sales: p[0], income: p[1], unfunded: p[2] };
    }
    var s = {
      v: STATE_VERSION,
      cuts: { property: clampN(num("cp", 0), -1, 0.5), income: clampN(num("ci", 0), -1, 0.5), sales: clampN(num("cs", 0), -1, 0.5) },
      lever: q.lv === "h" ? "homestead" : "cut", homestead_usd: q.lv === "h" ? clampN(num("hs", 0), 0, 500000) : 0,
      class_split: q.c1 != null && q.c2 != null ? { c1: clampN(num("c1", 0), -1, 0.5), c2: clampN(num("c2", 0), -1, 0.5) } : null,
      mix: mix, backfill: clampN(num("bf", 0), 0, 1)
    };
    // A link with no (or an unreadable) response setting loads the page's standard, typical, not "held steady" (R2-02). toQuery always writes bh, so only a trimmed link is affected.
    Object.assign(s, settingsFromQuery(q, d));
    return s;
  }

  /* Problems in a link that fromQuery repairs silently: the page must say so. Returns a list of codes. */
  function linkIssues(kernel, query) {
    var q = parseQuery(query), out = [];
    if (q.mx != null) {
      var p = q.mx.split(",").map(Number);
      if (!(p.length === 3 && p.every(function (x) { return isFinite(x) && x >= 0 && x <= 1; }) && Math.abs(p[0] + p[1] + p[2] - 1) < 1e-9)) out.push("mx_invalid");
    }
    var ranges = { cp: [-1, 0.5], ci: [-1, 0.5], cs: [-1, 0.5], pt: [0, 1], bf: [0, 1] };
    Object.keys(ranges).forEach(function (k) {
      if (q[k] == null) return;
      var x = q[k] === "" ? NaN : +q[k];
      if (!isFinite(x) || x < ranges[k][0] || x > ranges[k][1]) { if (out.indexOf("value_repaired") < 0) out.push("value_repaired"); }
    });
    if (q.bh != null && BEH.indexOf(behFromLink(q.bh)) < 0) out.push("beh_invalid");
    // nr is 0 or 1 and bp is 0, 0.5 or 1; anything else is repaired to the nearest allowed value (or off) and announced.
    if (q.nr != null && q.nr !== "0" && q.nr !== "1" && out.indexOf("value_repaired") < 0) out.push("value_repaired");
    if (q.bp != null && (q.bp === "" || !isFinite(+q.bp) || BP_STEPS.indexOf(+q.bp) < 0) && out.indexOf("value_repaired") < 0) out.push("value_repaired");
    return out;
  }

  /* A link made by another version: the schema `v` differs, or its model version `mv` (stamped by the page from kernel.meta.model_version in
     every link it writes) differs from this kernel's. The schema `v` alone never fires after a kernel rebuild; `mv` does. A link with no `mv`
     (made before stage B) cannot be told apart, so it raises no banner. */
  function versionMismatch(kernel, query) {
    var m = /(?:^|[?&])v=([^&]*)/.exec(String(query || "")), mv = /(?:^|[?&])mv=([^&]*)/.exec(String(query || ""));
    if (m && Number(m[1]) !== STATE_VERSION) return true;
    return !!mv && !!kernel && !!kernel.meta && decodeURIComponent(mv[1]) !== String(kernel.meta.model_version);
  }

  // The one dollar-amount formatter for the page (D-T3-37): under $1 billion "$660 million", at or above "$2.0 billion";
  // moneyShort is the same rule with "B" / "M" for tiles and chart lines. Magnitude only: the caller adds "less" / "more".
  var BILLION = 1e9, MILLION = 1e6;
  function money(x) {
    var a = Math.abs(x);
    if (a < 1) return "$0";
    if (a >= BILLION - MILLION / 2) return "$" + (a / BILLION).toFixed(1) + " billion";
    return "$" + Math.round(a / MILLION).toLocaleString("en-US") + " million";
  }
  function moneyShort(x) { return money(x).replace(/ billion$/, "B").replace(/ million$/, "M"); }

  function pct(x) { return (Math.round(Math.abs(x) * 1000) / 10) + "%"; }
  function dollars(x) { return "$" + Math.round(Math.abs(x) / 1e8) / 10 + " billion"; }

  /* Direction of the Step 1 gap on a normalized state: "raise" when the change brings governments more money (a give-back in
     Step 2), "cut" when it costs them money, null when nothing changes. The stamps use it so a raise never says "left unfunded". */
  function gapDirection(kernel, s) {
    var P = kernel.params, rev;
    if (s.lever === "homestead") rev = s.homestead_usd > 0 ? -1 : 0;
    else {
      var c1 = s.class_split ? s.class_split.c1 : s.cuts.property, c2 = s.class_split ? s.class_split.c2 : s.cuts.property;
      rev = c1 * P.class1_usd + c2 * P.class2_usd + s.cuts.income * P.state_income_collections + s.cuts.sales * P.state_sales_collections;
    }
    return Math.abs(rev) < 1 ? null : rev > 0 ? "raise" : "cut";
  }
  /* The response arm is named only where a Step 2 rate moves (D-T3-45): a sales or income share above zero with a gap to fill.
     A rate the user sets in Step 1 is static by the published convention and carries no arm. */
  function armParts(s, dir) {
    return { sales: !!dir && s.mix.sales > 0, income: !!dir && s.mix.income > 0 };
  }

  /* The scenario stamp printed in every chart and table caption: the levers, how the gap is paid, the renter
   * arm, the behavioral arm and the vintages. Built from the NORMALIZED state (so a snapped homestead value or
   * a moved share is what is printed). Never says "the amendment". `kernel.meta.stamp` (the property-tax
   * vintage note) is printed once per page, separately: OHTM.vintageNote(kernel). */
  function stamp(kernel, state, opts) {
    if (opts && opts.plain) return plainStamp(kernel, state, opts).line;
    // opts.step1: a Step 1 surface (before paying for it). Step 1 has no replacement tax and no shopper response,
    // so those parts are left out instead of printing a setting that does nothing there.
    var step1 = !!(opts && opts.step1);
    var s = normalize(kernel, state), parts = [], names = { property: "property", income: "state income", sales: "state sales" };
    delete s._flags;
    if (s.lever === "homestead") parts.push("homestead exemption of $" + s.homestead_usd.toLocaleString("en-US"));
    ["property", "income", "sales"].forEach(function (t) {
      if (t === "property" && s.lever === "homestead") return;
      if (t === "property" && s.class_split) {
        parts.push("property: homes " + (s.class_split.c1 <= 0 ? "cut " : "raised ") + pct(s.class_split.c1) +
          ", business " + (s.class_split.c2 <= 0 ? "cut " : "raised ") + pct(s.class_split.c2));
      } else if (s.cuts[t]) {
        parts.push(names[t] + " tax " + (s.cuts[t] < 0 ? "cut " : "raised ") + pct(s.cuts[t]));
      }
    });
    if (!parts.length) parts.push("no change");
    var m = s.mix, pay = [];
    if (m.sales > 0) pay.push("sales tax " + pct(m.sales));
    if (m.income > 0) pay.push("income tax " + pct(m.income));
    var dir = gapDirection(kernel, s), raise = dir === "raise", arm = armParts(s, dir);
    if (m.unfunded > 0) pay.push((raise ? "kept by governments " : "left unpaid ") + pct(m.unfunded));
    var v = kernel.meta.vintages, out = [parts.join(" and ")];
    if (!step1) out.push(pay.length === 1 && m.unfunded > 0 && !m.sales && !m.income ? pay[0] : (raise ? "given back by " : "paid for by ") + (pay.length ? pay.join(", ") : "nothing"));
    out.push("renters pay " + Math.round(s.pt * 100) + "% of a property-tax change through rent", "apartment multiple: " + s.grm);
    var cw = controlWords(kernel, s, { step1: step1 });
    if (cw) out.push(cw);
    if (!step1 && (arm.sales || arm.income)) {
      var who = arm.sales && arm.income ? "shopper and worker" : arm.sales ? "shopper" : "worker";
      out.push(s.beh === "none" ? (arm.sales && arm.income ? "shoppers and workers" : arm.sales ? "shoppers" : "workers") + " held steady" : (s.beh === "central" ? "typical " : "strong ") + who + " response");
    }
    // The revenue concept only governs the Step 2 replacement rates, so Step 1 stamps leave it out.
    // net_state_local: new sales tax is counted for state and local governments together, after lost sales.
    if (!step1) out.push(kernel.meta.revenue_concept === "net_state_local" ? "revenue counted for state and local governments together, after lost sales" : kernel.meta.revenue_concept.replace(/_/g, " ") + " revenue concept");
    out.push(
      v.property + " property \u00b7 " + v.income_law + " income law \u00b7 " + v.acs,
      "model " + kernel.meta.model_version + (kernel.meta.git_sha ? " \u00b7 data build " + String(kernel.meta.git_sha).slice(0, 7) : ""));
    return out.join("; ");
  }


  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function plainList(a) { return a.length < 3 ? a.join(" and ") : a.slice(0, -1).join(", ") + ", and " + a[a.length - 1]; }

  /* The plain-words line under every chart and list (D-T3-27): no hashes, vintages or setting names.
   *   "First-year scenario, not a forecast · <phase> · <scenario>; <how it is paid for>; <response>; <renters> · Ohio Tax Model, Swank Program, OSU, model v04 (Oct 2026)"
   * Returns the pieces too ({lead, scenario, model, line}) so a chart can set the lead in bold. `opts.phase` is the
   * page's own wording ("After paying for it."), `opts.step1` drops the replacement tax and the response (Step 1
   * has neither). The technical stamp() stays for table captions and the CSV. */
  function plainStamp(kernel, state, opts) {
    var step1 = !!(opts && opts.step1), phase = String((opts && opts.phase) || "").replace(/\.$/, "");
    var s = normalize(kernel, state), parts = [], names = { property: "Property tax", income: "State income tax", sales: "State sales tax" };
    delete s._flags;
    if (s.lever === "homestead") parts.push("Homestead exemption of $" + s.homestead_usd.toLocaleString("en-US"));
    ["property", "income", "sales"].forEach(function (t) {
      if (t === "property" && s.lever === "homestead") return;
      if (t === "property" && s.class_split) {
        parts.push("Property tax: homes " + (s.class_split.c1 <= 0 ? "cut " : "raised ") + pct(s.class_split.c1) + ", business " + (s.class_split.c2 <= 0 ? "cut " : "raised ") + pct(s.class_split.c2));
      } else if (s.cuts[t]) {
        parts.push(names[t] + (s.cuts[t] <= -1 ? " ended" : s.cuts[t] < 0 ? " cut " + pct(s.cuts[t]) : " raised " + pct(s.cuts[t])));
      }
    });
    if (!parts.length) parts.push("No change");
    var seg = [parts.join(" and ")], m = s.mix, pay = [];
    if (!step1) {
      if (m.sales > 0) pay.push("sales tax " + pct(m.sales));
      if (m.income > 0) pay.push("income tax " + pct(m.income));
      var dir = gapDirection(kernel, s), raise = dir === "raise", arm = armParts(s, dir);
      if (m.unfunded > 0) pay.push((raise ? "kept by governments " : "left unpaid ") + pct(m.unfunded));
      seg.push(pay.length === 1 && m.unfunded > 0 && !m.sales && !m.income ? (raise ? "extra kept by governments" : "left unpaid") : (raise ? "given back by " : "paid for by ") + plainList(pay));
      if (arm.sales || arm.income) seg.push(s.beh === "none" ? "people held steady" : (s.beh === "central" ? "typical" : "strong") + " response");
    }
    // opts.tenure "o": an owner's card does not name the landlord setting, which the owner cannot see or change (SC-06).
    if ((s.cuts.property || s.class_split) && !(opts && opts.tenure === "o")) seg.push("landlords pass " + Math.round(s.pt * 100) + "% to renters");
    var cw = controlWords(kernel, s, { step1: step1 });
    if (cw) seg.push(cw);
    // The apartment multiple has no control on the page, so a stamp names it only when a link set it off the standard (R2-02).
    if (s.grm !== "central" && (s.cuts.property || s.class_split)) seg.push("apartment multiple " + gmWord(s.grm));
    var mv = /^(v\d+)(?:.*?(\d{4})-(\d{2})-\d{2})?$/.exec(String(kernel.meta.model_version)), when = mv && mv[2] ? " (" + MONTHS[+mv[3] - 1] + " " + mv[2] + ")" : "";
    var model = "Ohio Tax Model, Swank Program, OSU, model " + (mv ? mv[1] : kernel.meta.model_version) + when;
    var lead = "First-year scenario, not a forecast" + (phase ? " \u00b7 " + phase : ""), scenario = seg.join("; ");
    // opts.bracket: a bracket() result for the cell the chart or card is about; its short words (no settings at each end) ride in the stamp (D-T3B-6).
    var bw = opts && opts.bracket ? bracketWords(opts.bracket, { short: true }) : null;
    return { lead: lead, scenario: scenario, model: model, bracket: bw, line: lead + " \u00b7 " + scenario + (bw ? " \u00b7 " + bw : "") + " \u00b7 " + model };
  }

  function vintageNote(kernel) { return kernel.meta.stamp; }

  // ---------- the two stage-B controls: where they apply, how they read, the bracket and the sign sentence --------------------

  /* Whether each control does anything on this (normalized) state. The page disables a control that is inert and says why; the
     stamps name a control only where it applies, so an income-tax cut never carries "state's credit saving not counted". */
  function controlsApply(kernel, s) {
    var P = kernel.params, D = kernel.statewide.decomposition, homestead = s.lever === "homestead";
    if (homestead) return { nr: false, bp: false };
    var c1 = s.class_split ? s.class_split.c1 : s.cuts.property, c2 = s.class_split ? s.class_split.c2 : s.cuts.property;
    var gap = -(c1 * P.class1_usd + c2 * P.class2_usd + s.cuts.income * P.state_income_collections + s.cuts.sales * P.state_sales_collections);
    var apt = D.apartments_full_usd[s.grm === "central" ? "central" : s.grm + "_grm"];
    return { nr: c1 < 0 && gap > 0, bp: c2 * (P.class2_usd - apt) < 0 };
  }
  var BP_WORDS = ["business savings kept by owners", "half of business savings passed on", "all of business savings passed on"];
  var SEP = "; ";   // one separator inside a list of settings; "\u00b7" only between blocks of a stamp (SC-19)
  /* The control states in words, for stamps, the card and the CSV. `step1` leaves out the credit saving (Step 1 has no replacement
     tax). Empty string when neither control applies. */
  function controlWords(kernel, state, opts) {
    var s = normalize(kernel, state), ap = controlsApply(kernel, s), out = [];
    if (ap.nr && !(opts && opts.step1)) out.push(s.nr ? "state's credit saving counted" : "state's credit saving not counted");
    if (ap.bp) out.push(BP_WORDS[BP_STEPS.indexOf(s.bp)]);
    return out.join(SEP);
  }
  /* Controls that differ from the page's defaults (nr 0, bp 0), as plain phrases: a link that opens with any of them gets a banner. */
  function controlsOffDefault(state) {
    var out = [];
    if (state.nr) out.push("the state's credit saving is counted toward the replacement");
    if (state.bp > 0) out.push((state.bp >= 1 ? "all" : "half") + " of the business property-tax saving is passed to households");
    return out;
  }
  function behWords(beh) { return beh === "none" ? "people held steady" : (beh === "central" ? "typical" : "strong") + " response"; }
  /* The settings in words. `settings` is { pt, beh, nr, bp } (a state works too). opts.tenure "o" drops the landlord clause: an owner
     cannot see or change it, so no owner-facing line names it (SC-06). opts.apply = controlsApply(...) drops a control that does nothing
     here. The technical stamp, the CSV and the Layer 2 stamps pass no tenure and keep every clause. */
  function settingsWords(settings, opts) {
    var o = opts || {}, ap = o.apply || { nr: true, bp: true }, out = [];
    if (o.tenure !== "o" && ap.pt !== false) out.push("landlords pass " + Math.round(settings.pt * 100) + "% to renters");   // H12: only where a property change uses the landlord share
    out.push(behWords(settings.beh));
    if (ap.nr) out.push(settings.nr ? "state's credit saving counted" : "state's credit saving not counted");
    if (ap.bp) out.push(BP_WORDS[BP_STEPS.indexOf(settings.bp)]);
    // The apartment multiple has no control; it is named only when a link set it off the standard (and the caller has not said it does not apply here).
    if (settings.grm && settings.grm !== "central" && ap.gm !== false) out.push("apartment multiple " + gmWord(settings.grm));
    return out.join(SEP);
  }
  /* Only the settings that differ from the page's standard ones, in words ("the standard settings" when none do): the label on each end
     of the bracket. */
  function standardSettings(kernel) { return { pt: kernel.params.pass_through_arms[kernel.meta.headline_pass_through_arm], beh: "central", grm: "central", nr: 0, bp: 0 }; }
  // The words for a non-standard value of each setting, and for the standard one ("(standard: typical)"). `grm` central reads "typical".
  var GM_WORDS = { low: "low", central: "typical", high: "high" };
  function gmWord(g) { return GM_WORDS[g] || "typical"; }
  /* Every setting that is off the page's standard, in words, each with its standard beside it (R2-02): a list of phrases, [] at the standard
     settings. The link banner prints it, and so does the preset cards' "at this page's current settings" test. Settings checked: the landlord
     share (pt), the response arm (beh), the apartment multiple (grm, which has no control on the page), the credit saving (nr), business
     pass-through (bp). Works on any state or { pt, beh, grm, nr, bp }; a missing field counts as standard. Call settingsDiff(kernel, state) or
     settingsDiff(state) (then the last kernel the engine saw supplies the standard landlord share). */
  function settingsDiff(a, b) {
    var kernel = a && a.params ? a : (b && b.params ? b : lastKernel), st = a && a.params ? b : a;
    if (!kernel || !st) return [];
    var d = standardSettings(kernel), out = [];
    // H12: the landlord share and the apartment multiple only move a property change; with no property change (an income or sales cut) they are not listed.
    var noProp = !!(st.cuts && !st.cuts.property && !st.class_split && st.lever !== "homestead");
    if (!noProp && st.pt != null && Math.abs(st.pt - d.pt) > 1e-9) out.push("landlords pass " + Math.round(st.pt * 100) + "% to renters (standard: " + Math.round(d.pt * 100) + "%)");
    if (st.beh != null && st.beh !== d.beh) out.push((st.beh === "none" ? "people held steady" : "strong response") + " (standard: typical)");
    if (!noProp && st.grm != null && st.grm !== d.grm) out.push("apartment multiple " + gmWord(st.grm) + " (standard: " + gmWord(d.grm) + ")");
    if (st.nr != null && !!st.nr !== !!d.nr) out.push("state's credit saving counted (the standard setting leaves it out)");
    if (st.bp != null && Math.abs(st.bp - d.bp) > 1e-9) out.push(BP_WORDS[BP_STEPS.indexOf(snapBp(st.bp))] + " (standard: none passed on)");
    return out;
  }
  /* The words the page prints for a cell: the display rule itself, the same words the result card prints (G5). Not shown, about even, a range
     ("between $lo and $hi more", or "up to $hi less" when the low end rounds to $0), or the mean to the nearest $10 ("$40 more", "no change").
     Every line that names a number for some other setting (the bracket's two ends, the consequence under each control, the landlord cases) goes
     through this function, so none can disagree with the card at the edge. `cell` needs { mean, mode }; a range cell carries { lo, hi } (the kernel's
     rounded bounds). A range cell without bounds falls back to its mean. */
  function displayWord(cell) {
    if (!cell || cell.mode === "hidden") return "not shown";
    if (cell.mode === "about_even") return "about even";
    var dir = cell.mean < 0 ? " less" : " more", usd = function (x) { return "$" + x.toLocaleString("en-US"); };
    if (cell.mode === "range" && cell.lo != null && cell.hi != null) return (cell.lo === 0 ? "up to " + usd(cell.hi) : "between " + usd(cell.lo) + " and " + usd(cell.hi)) + dir;
    var r = round10(cell.mean);
    return r === 0 ? "no change" : usd(Math.abs(r)) + (r < 0 ? " less" : " more");
  }
  function diffWords(kernel, settings, opts) {
    var d = standardSettings(kernel), o = opts || {}, out = [];
    if (o.pt && Math.abs(settings.pt - d.pt) > 1e-9) out.push("landlords pass " + Math.round(settings.pt * 100) + "%");
    if (settings.beh !== d.beh) out.push(settings.beh === "none" ? "people held steady" : "strong response");
    if (o.nr && settings.nr !== d.nr) out.push("state's credit saving counted");
    if (o.bp && settings.bp !== d.bp) out.push(BP_WORDS[BP_STEPS.indexOf(settings.bp)]);
    return out.length ? out.join(SEP) : "the standard settings";
  }

  var ROUND_HH = 10;   // per-household averages print to the nearest $10 (the display rule's rounding, as on the page)
  function round10(x) { return Math.round(x / ROUND_HH) * ROUND_HH + 0; }   // + 0 turns -0 into 0
  /* The signed interval a cell's display words cover (H1): about even = [0, 0]; a range cell = its printed bounds with the mean's sign
     ("between $20 and $160 less" = [-160, -20]; "up to $90 more" = [0, 90]); a plain number = its rounded mean. The bracket ranks by this,
     not by the rounded mean, so an end the card would print as a range is never hidden behind a tie on the mean. */
  function cellInterval(c) {
    if (c.mode === "about_even") return { ilo: 0, ihi: 0 };
    if (c.mode === "range" && c.lo != null && c.hi != null) return c.mean < 0 ? { ilo: -c.hi + 0, ihi: -c.lo + 0 } : { ilo: c.lo + 0, ihi: c.hi + 0 };
    var r = round10(c.mean); return { ilo: r, ihi: r };
  }

  function pickCell(res, key) {
    var t = key.tenure;
    if (key.region_id != null) {
      var list = key.decile != null ? res.cells.region_tenure_decile : res.cells.region_tenure;
      if (!list) return null;
      return list.filter(function (c) { return c.tenure === t && c.region_id === key.region_id && (key.decile == null || c.decile === key.decile); })[0] || null;
    }
    if (key.decile != null) return res.cells.decile_tenure.filter(function (c) { return c.tenure === t && c.decile === key.decile; })[0] || null;
    return res.statewide.all[t === "o" ? "owner" : "renter"];
  }

  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }
  function stateWith(base, o) { var st = clone(base); Object.keys(o).forEach(function (k) { st[k] = o[k]; }); return st; }
  /* Which controls move this state's household numbers at all: the landlord share needs a property change, the others need what
     controlsApply says. */
  function appliesFor(kernel, base, key) {
    var ap = controlsApply(kernel, base);
    return { pt: key.tenure === "r" && (base.cuts.property !== 0 || !!base.class_split), nr: ap.nr, bp: ap.bp };
  }
  /* The grid every control on the page offers, in the control's own order. The current value joins it (a hand-edited link can carry a
     landlord share between slider steps), so the current value is always inside. */
  function bracketGrid(kernel, base, key) {
    var ap = appliesFor(kernel, base, key), asc = function (a, b) { return a - b; };
    return { applies: ap, pt: ap.pt ? uniq(PT_STEPS.concat([base.pt])).sort(asc) : [base.pt], beh: uniq(BEH.concat([base.beh])),
      nr: ap.nr ? [0, 1] : [base.nr], bp: ap.bp ? uniq(BP_STEPS.concat([base.bp])).sort(asc) : [base.bp] };
  }
  /* How many settings differ from the page's standard ones: an exact tie between two settings names the one nearer the standard. */
  function deviations(kernel, o) {
    var d = standardSettings(kernel);
    return (Math.abs(o.pt - d.pt) > 1e-9 ? 1 : 0) + (o.beh !== d.beh ? 1 : 0) + (o.nr !== d.nr ? 1 : 0) + (o.bp !== d.bp ? 1 : 0);
  }

  /* The bracket (D-T3B-6, SC-01): the after-paying mean of one cell across EVERY value of every control the page lets a reader set:
     landlord pass-through at each slider step (0, 25, 50, 75, 100%; renters), the response arm (held steady, typical, strong), the state's
     credit saving (not counted, counted), business pass-through (none, half, all). The current state's own values are included, so the current
     value always sits inside, and every single-control consequence the page prints is a member of this grid. Other levers (the cuts, the
     split, the apartment multiple) stay as set. Values print to the nearest $10, as the cells do. min/max carry `words`: the settings at that
     end ("state's credit saving counted; all of business savings passed on", or "the standard settings"). `key` = { tenure: "o"|"r",
     decile?: 1..10 (omit for all incomes), region_id? }. Returns null for a hidden cell. width 0 (inert: true) means no control on the page
     changes this cell's number. Means only: a cell's own sampling error is a separate display (modes). */
  function bracket(kernel, state, key) {
    var base = normalize(kernel, state); delete base._flags;
    var r0 = evaluate(kernel, base), c0 = pickCell(r0, key);
    if (!c0 || c0.mode === "hidden") return null;
    var grid = bracketGrid(kernel, base, key), ap = grid.applies;
    var best = null, worst = null, seen = 0, words0 = null, allSame = true;
    grid.pt.forEach(function (pt) { grid.beh.forEach(function (beh) { grid.nr.forEach(function (nr) { grid.bp.forEach(function (bp) {
      var c = pickCell(evaluate(kernel, stateWith(base, { pt: pt, beh: beh, nr: nr, bp: bp })), key);
      if (!c || !isFinite(c.mean)) return;
      seen++;
      var iv = cellInterval(c), w = displayWord(c);
      var o = { usd: c.mean, usd_rounded: round10(c.mean), ilo: iv.ilo, ihi: iv.ihi, mode: c.mode, word: w, settings: { pt: pt, beh: beh, nr: nr, bp: bp } };
      if (words0 == null) words0 = w; else if (w !== words0) allSame = false;
      // Rank by what prints: the lowest printed low end is the minimum, the highest printed high end the maximum. On an exact tie name the setting
      // nearer the standard, then the lower (for the minimum) or higher (for the maximum) exact mean.
      var dv = deviations(kernel, o.settings);
      var lower = function (x) { return o.ilo < x.ilo || (o.ilo === x.ilo && (dv < x.dev || (dv === x.dev && o.usd < x.usd - 1e-9))); };
      var higher = function (x) { return o.ihi > x.ihi || (o.ihi === x.ihi && (dv < x.dev || (dv === x.dev && o.usd > x.usd + 1e-9))); };
      o.dev = dv;
      if (!best || lower(best)) best = o;
      if (!worst || higher(worst)) worst = o;
    }); }); }); });
    if (!best) return null;
    [best, worst].forEach(function (e) { e.words = diffWords(kernel, e.settings, ap); delete e.dev; });
    var width = worst.usd_rounded - best.usd_rounded, ci = cellInterval(c0);   // width stays on the rounded means (published extremes do not move)
    return { key: key, settings_tried: seen, grid: { pt: grid.pt, beh: grid.beh, nr: grid.nr, bp: grid.bp }, current: { usd: c0.mean, usd_rounded: round10(c0.mean), ilo: ci.ilo, ihi: ci.ihi },
      min: best, max: worst, width_usd: width, inert: allSame };
  }
  /* The bracket in words, signed like every household number (negative = pays less). opts.short leaves out the settings at each end
     (the plain stamp carries the short form; the card carries the full one). */
  function bracketWords(b, opts) {
    if (!b) return null;
    if (b.inert) return "No other setting on this page changes this number";
    var ends = [b.min, b.max];
    // Both ends on one side of zero: the end nearer zero comes first, so "between $220 less and $1,870 less" reads in order.
    // An about-even end counts as the middle: "between $560 less and about even", never "between about even and $560 less" (H28).
    if (b.min.ilo < 0 && b.max.ihi < 0 && Math.abs(b.min.ilo) > Math.abs(b.max.ihi)) ends = [b.max, b.min];
    var one = function (e) { return e.word + (opts && opts.short ? "" : " (" + e.words + ")"); };
    var lead = "Across the settings on this page: ";
    // Both ends print the same words (say, "about even" at both): say it once. A range end already reads "between $a and $b more", so the sentence
    // then runs "from ... to ..." rather than "between between".
    if (ends[0].word === ends[1].word) return lead + ends[0].word;
    return lead + (/^between /.test(ends[0].word) || /^between /.test(ends[1].word) ? "from " + one(ends[0]) + " to " + one(ends[1]) : "between " + one(ends[0]) + " and " + one(ends[1]));
  }
  /* "If landlords pass on none, half or all of their saving: $X more / $Y more / $Z less" (SC-01): the renter's three evaluations at the
     landlord share 0, 50% and 100%, every other setting as set. null for an owner, or when no property change is on. */
  function landlordCases(kernel, state, key) {
    var base = normalize(kernel, state); delete base._flags;
    if (key.tenure !== "r" || !(base.cuts.property !== 0 || base.class_split)) return null;
    var pts = [0, 0.5, 1];
    if (pts.every(function (v) { return Math.abs(v - base.pt) > 1e-9; })) pts = [0, 0.5, base.pt, 1].sort(function (a, b) { return a - b; });
    var cases = pts.map(function (pt) {
      var c = pickCell(evaluate(kernel, stateWith(base, { pt: pt })), key);
      return c && c.mode !== "hidden" ? { pt: pt, usd: c.mean, usd_rounded: round10(c.mean), word: displayWord(c) } : null;
    });
    if (cases.some(function (x) { return !x; })) return null;
    var c1 = base.class_split ? base.class_split.c1 : base.cuts.property, noun = c1 <= 0 ? "saving" : "increase";
    // The current setting is named in the line when it is not none, half or all (R1-02): "none, half, 75% (now) or all".
    var names = cases.map(function (c) { return c.pt === 0 ? "none" : c.pt === 0.5 ? "half" : c.pt === 1 ? "all" : Math.round(c.pt * 100) + "% (the setting now)"; });
    return { cases: cases, words: "If landlords pass on " + names.slice(0, -1).join(", ") + " or " + names[names.length - 1] + " of their " + noun + ": " + cases.map(function (c) { return c.word; }).join(" / ") };
  }
  /* What each control does to one cell and to the rates when it alone moves to each of its other values (the "\u2192" figures printed beside
     the controls). Every value is one point of the bracket grid, so it lies inside the bracket (tested). null for a control that does nothing
     here. `arm` keys the rates by the variant's own response arm. */
  function controlEffects(kernel, state, key) {
    var base = normalize(kernel, state); delete base._flags;
    var grid = bracketGrid(kernel, base, key), ap = grid.applies;
    function at(o) {
      var st = stateWith(base, o), r = evaluate(kernel, st), c = pickCell(r, key);
      if (!c || c.mode === "hidden") return null;
      var arm = st.beh === "none" ? "static_after" : st.beh === "high" ? "high_after" : "central_after";
      return Object.assign({ mean: c.mean, se: c.se, lo: c.lo, hi: c.hi, mode: c.mode, usd_rounded: round10(c.mean), word: displayWord(c), sales_rate: r.sales[arm], income_rate: r.income[arm] }, o);
    }
    var out = { pt: null, beh: null, nr: null, bp: null, current: at({}) };
    if (ap.pt) out.pt = PT_STEPS.map(function (v) { return at({ pt: v }); });
    out.beh = BEH.map(function (v) { return at({ beh: v }); });
    if (ap.nr) out.nr = [0, 1].map(function (v) { return at({ nr: v }); });
    if (ap.bp) out.bp = BP_STEPS.map(function (v) { return at({ bp: v }); });
    return out;
  }

  /* The by-income sign sentence for the card (D-T3B-2): "Homeowners earning under about $56,000 pay less on average; above that, more."
     Returned only when the ten after-paying cells are monotone in income with at most one about-even cell, and that cell sits where the
     sign changes (or the rule below is met); otherwise null and the card points to the by-income chart. A hidden cell gives null. */
  function signSentence(kernel, res, tenure) {
    var rows = res.cells.decile_tenure.filter(function (c) { return c.tenure === tenure; }).sort(function (a, b) { return a.decile - b.decile; });
    if (rows.length !== 10) return null;
    var sg = [], i;
    for (i = 0; i < 10; i++) {
      var c = rows[i];
      if (c.mode === "hidden") return null;
      if (c.mode === "about_even") sg.push(0);
      else if (c.mode === "number") { var r = round10(c.mean); sg.push(r === 0 ? 0 : r < 0 ? -1 : 1); }
      else sg.push(c.mean < 0 ? -1 : 1);
    }
    var zeros = [], nz = [];
    sg.forEach(function (v, k) { if (v === 0) zeros.push(k); else nz.push(v); });
    if (zeros.length > 1 || !nz.length) return null;
    var changes = 0; for (i = 1; i < nz.length; i++) if (nz[i] !== nz[i - 1]) changes++;
    if (changes > 1) return null;
    var who = tenure === "o" ? "Homeowners" : "Renters", bounds = kernel.decile_bounds;
    var k1 = function (x) { return "$" + (Math.round(x / 1000) * 1000).toLocaleString("en-US"); };
    var dir = function (v) { return v < 0 ? "less" : "more"; }, verb = function (v) { return v < 0 ? "pay less" : "pay more"; };
    if (changes === 0) {
      if (zeros.length) return null;   // all one sign plus an about-even end cell: the card points to the chart instead
      return who + " in all ten income ranges " + verb(nz[0]) + " on average.";
    }
    var first = nz[0], second = -nz[0], z = zeros.length ? zeros[0] : null, lastFirst;
    if (z != null) {
      if (!(sg[z - 1] === first && sg[z + 1] === second)) return null;   // an about-even cell must sit exactly at the sign change
      lastFirst = z - 1;
      return who + " earning under about " + k1(bounds[lastFirst].hi) + " " + verb(first) + " on average; those earning about " + k1(bounds[z].lo) + " to " + k1(bounds[z].hi) +
        " come out about even; above that, " + dir(second) + ".";
    }
    for (i = 0; i < 10 && sg[i] === first; i++) lastFirst = i;
    return who + " earning under about " + k1(bounds[lastFirst].hi) + " " + verb(first) + " on average; above that, " + dir(second) + ".";
  }

  return {
    bracket: bracket, cellInterval: cellInterval, bracketWords: bracketWords, landlordCases: landlordCases, controlEffects: controlEffects, behWords: behWords,
    PT_STEPS: PT_STEPS, BP_STEPS: BP_STEPS, BEH: BEH, standardSettings: standardSettings, signSentence: signSentence, controlWords: controlWords, controlsOffDefault: controlsOffDefault,
    controlsApply: controlsApply, settingsWords: settingsWords, settingsDiff: settingsDiff, displayWord: displayWord,
    stepsToMix: stepsToMix, mixToSteps: mixToSteps,
    PRESET_IDS: PRESET_IDS, presetFromQuery: presetFromQuery, axisSides: axisSides,
    roughEstimate: roughEstimate, parseAmount: parseAmount, ESTIMATE_RANGE: ESTIMATE_RANGE,
    rangeOf: rangeOf, rangeWords: rangeWords, COMPS: COMPS, defaultState: defaultState, evaluate: evaluate, toQuery: toQuery, fromQuery: fromQuery,
    money: money, moneyShort: moneyShort, MIDDLE_DECILE: MIDDLE_DECILE, versionMismatch: versionMismatch, linkIssues: linkIssues, stamp: stamp, plainStamp: plainStamp, vintageNote: vintageNote, largestRemainder: largestRemainder, sharesHalfUp: sharesHalfUp, gapDirection: gapDirection,
    NO_ALT_LEVELS: NO_ALT_LEVELS, _solveSales: solveSales, _solveIncome: solveIncome, _salesFactor: salesFactor
  };
});
