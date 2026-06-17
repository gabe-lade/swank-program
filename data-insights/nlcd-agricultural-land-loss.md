---
layout: default
title: "Tracking agricultural land loss with NLCD"
permalink: /data/insights/nlcd-agricultural-land-loss/
description: "Interactive map of Ohio agricultural land-cover change from 1985 to 2024, built from Annual NLCD land-cover rasters."
---

<article class="page">
  <header class="page-header">
    <h1>Tracking agricultural land loss with NLCD</h1>
    <p class="page-subtitle">Interactive map of Ohio agricultural land-cover change from 1985 to 2024.</p>
    <div class="page-meta">
      <p><strong>Authors:</strong> <a href="https://jingke-wu.github.io/">Jingke Wu</a>, <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a>, <a href="https://sites.google.com/view/zhiningsun">Zhining Sun</a>, and <a href="https://cfaes.osu.edu/person/ani-katchova">Ani Katchova</a>.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      This tool uses Annual NLCD land-cover rasters to compare agricultural land across any pair of years from 1985 to 2024. It maps gross loss, gross gain, net loss, and agricultural land converted to development, with statewide and county-level summaries.
    </p>

    <div class="use-box">
      <h2>Use this map</h2>
      <p><strong>Best for:</strong> journalists, local officials, and researchers tracking farmland conversion in Ohio.</p>
      <p><strong>What it shows:</strong> agricultural land-cover change across Ohio from 1985 to 2024 from annual NLCD satellite data — gross loss, gross gain, net loss, and farmland converted to development, statewide and by county.</p>
      <p><strong>Caveat:</strong> land cover is classified from remotely sensed imagery; it is not the same as parcel ownership, zoning, or farmland-program enrollment, and small year-to-year changes can reflect classification noise.</p>
      <p><strong>Suggested citation:</strong></p>
      <div class="cite-block">
        <p class="cite-text" id="nlcd-citation">Wu, Jingke, Gabriel E. Lade, Zhining Sun, and Ani Katchova. "Tracking Agricultural Land Loss with NLCD." C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026. Data from the Annual National Land Cover Database (MRLC/USGS), 1985–2024.</p>
        <button type="button" class="cite-copy" data-copy-target="nlcd-citation">Copy citation</button>
      </div>
    </div>

    <section class="data-section">
      <h2>Key numbers (1985&ndash;2024)</h2>
      <p>Statewide totals computed from the annual NLCD data behind the map. Agricultural land is NLCD Pasture/Hay (81) plus Cultivated Crops (82); acres are counted from the original 30&nbsp;m pixels.</p>
      <ul class="notes-list">
        <li><strong>Agricultural land, 1985:</strong> about 13.6 million acres (13,640,765).</li>
        <li><strong>Agricultural land, 2024:</strong> about 13.0 million acres (12,954,971).</li>
        <li><strong>Net loss, 1985&ndash;2024:</strong> about 686,000 acres — a 5.0% decline.</li>
        <li><strong>Farmland converted to development:</strong> about 726,000 acres, which is 77% of all gross agricultural-land loss.</li>
        <li><strong>Counties with the most net farmland loss:</strong> Franklin (about 53,000 acres), Delaware (38,000), Warren (34,000), Butler (33,000), and Lorain (22,000).</li>
      </ul>
      <p>Download the underlying data: <a href="{{ '/assets/data-insights/nlcd-agricultural-land-loss/data/annual_region_metrics.csv' | relative_url }}">annual agricultural and developed land by county and year (CSV)</a>.</p>
      <p class="last-updated">Source: Annual National Land Cover Database (MRLC/USGS), 1985–2024, processed by the Swank Program. Updated June 2026.</p>
    </section>

    <section class="data-section">
      <h2>Interactive map</h2>
      <p>
        Use the year controls to compare land cover between two years. The grid view shows pixel-level agricultural transitions, while the county view summarizes change by county and lets you inspect local trends and destination land-cover classes.
      </p>

      <iframe
        id="nlcd-frame"
        class="insight-map-frame"
        src="{{ '/assets/data-insights/nlcd-agricultural-land-loss/index.html' | relative_url }}"
        title="Ohio agricultural land loss interactive map"
        loading="lazy"></iframe>
    </section>

    <section class="data-section">
      <h2>Related reports</h2>
      <p>
        This tool builds on work outlined in two reports from the Ohio State University Department of Agricultural, Environmental, and Development Economics:
      </p>
      <ul class="notes-list">
        <li><a href="https://aede.osu.edu/sites/default/files/2026-04/Katchova_AgLandLost_Q32025.pdf">Agricultural Land Lost to Development in Ohio</a> (Katchova, Sun, &amp; Cohen, July 2025).</li>
        <li><a href="https://aede.osu.edu/sites/default/files/2026-06/Katchova%20and%20Lade_Ag%20Land%20and%20Land%20Loss.pdf">Measuring Agricultural Land and Land Loss in Ohio: Why the Numbers Differ Across Datasets</a> (Katchova, Lade, Sun, &amp; Wu, June 2026).</li>
      </ul>
    </section>

    <section class="data-section">
      <h2>Sources and notes</h2>
      <ul class="notes-list">
        <li>The source product is MRLC/USGS Annual NLCD Collection 1 Version 1 land cover for 1985&ndash;2024.</li>
        <li>Agricultural land is defined as NLCD 81 Pasture/Hay plus 82 Cultivated Crops.</li>
        <li>Developed land includes NLCD 21, 22, 23, and 24.</li>
        <li>Area metrics are counted from the original 30 m Albers Equal Area NLCD pixels; the web map display is not used for area calculations.</li>
      </ul>
      <p class="last-updated">Last updated: June 16, 2026</p>
    </section>
  </div>
</article>

<script>
  (function () {
    var frame = document.getElementById('nlcd-frame');
    if (!frame) return;
    function resize() {
      try {
        var doc = frame.contentWindow.document;
        var h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
        frame.style.height = h + 'px';
      } catch (e) { /* cross-origin: leave CSS height in place */ }
    }
    frame.addEventListener('load', function () {
      resize();
      // Re-measure after Leaflet and the panel charts finish drawing.
      [200, 600, 1500, 3000].forEach(function (t) { setTimeout(resize, t); });
    });
    window.addEventListener('resize', resize);
  })();
</script>
<script src="{{ '/assets/js/copy-citation.js' | relative_url }}" defer></script>
