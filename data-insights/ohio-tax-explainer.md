---
layout: default
title: "Ohio Tax Explainer"
permalink: /data/insights/ohio-tax-explainer/
description: "An interactive guide to the state and local taxes Ohioans pay — and who actually collects them."
---

<article class="page">
  <header class="page-header">
    <h1>Ohio Tax Explainer</h1>
    <p class="page-subtitle">An interactive guide to the state and local taxes Ohioans pay — and who actually collects them.</p>
    <div class="page-meta">
      <p><strong>Authors:</strong> <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a> and Alex Ryan.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      This page collects the interactive maps and key numbers behind our newsletter series, "Ohio's Taxes, Explained." Everything here is built from public Ohio Department of Taxation data.
    </p>
    <p>
      Ohioans pay a surprising number of overlapping taxes — to the state, a county, a city or township, a school district, and a cluster of special districts — and this is where we make that visible. We'll keep adding maps as the series continues.
    </p>

    <div class="use-box">
      <h2>Use &amp; cite this tool</h2>
      <p><strong>Best for:</strong> Ohio residents, local officials, journalists, and researchers who want to see who taxes a given place and how a tax bill is split.</p>
      <p><strong>How to use:</strong> Hover (or tap on mobile) anywhere in Ohio to see every general-purpose government that taxes that spot — your county, your city or township, and your school district, with the state above them all. Read it as "which governments tax here," not as an exact dollar bill.</p>
      <p><strong>Suggested citation:</strong></p>
      <div class="cite-block">
        <p class="cite-text" id="tax-citation">Lade, Gabriel E., and Alex Ryan. "Ohio Tax Explainer." C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026.</p>
        <button type="button" class="cite-copy" data-copy-target="tax-citation">Copy citation</button>
      </div>
    </div>

    <section class="data-section">
      <h2>Key statistics</h2>
      <ul class="notes-list">
        <li><strong>~$70 billion</strong> &mdash; Ohio's annual state and local tax collections (~$32B state, ~$38B local).</li>
        <li><strong>$25.2 billion</strong> &mdash; annual property tax, the single largest tax (~$2,140 per resident).</li>
        <li><strong>~65%</strong> &mdash; share of the property tax that funds public schools.</li>
        <li><strong>10+</strong> &mdash; governments that typically tax a single Ohio parcel.</li>
        <li><strong>88 counties &middot; 900+ cities &amp; villages &middot; ~1,300 townships &middot; 600+ school districts.</strong></li>
        <li><strong>$0</strong> &mdash; property tax collected by the State of Ohio (it levies none).</li>
      </ul>
      <p class="last-updated">Source: Ohio Department of Taxation Tax Data Series; U.S. Census / ACS.</p>
    </section>

    <section class="data-section">
      <h2>Who taxes you?</h2>
      <p>
        Hover anywhere in Ohio to see the full stack of governments that can tax that spot. Cities and townships are mostly mutually exclusive (incorporated vs. unincorporated), so usually only one of those fills in. This map shows the big, general-purpose governments; libraries, parks, transit, and other special districts also tax the parcel and aren't drawn here.
      </p>

      <iframe
        class="insight-map-frame"
        src="{{ '/assets/data-insights/ohio-tax-explainer/who_taxes_you.html' | relative_url }}"
        title="Map of the Ohio governments that tax a given location"
        loading="lazy">
      </iframe>
    </section>

    <section class="data-section">
      <h2>More maps coming soon</h2>
      <p>
        This page will grow with the newsletter series. Coming next: where each tax is <em>collected</em> across Ohio's 88 counties, and what local governments <em>spend</em> the money on.
      </p>
    </section>

    <section class="data-section">
      <h2>Read more</h2>
      <ul class="notes-list">
        <li>"Who Taxes You in Ohio?" (Substack) &mdash; link to be added when the post is live.</li>
      </ul>
    </section>

    <section class="data-section">
      <h2>Sources and notes</h2>
      <ul class="notes-list">
        <li>Tax totals: Ohio Department of Taxation Tax Data Series. Boundaries: U.S. Census TIGER (counties, school districts) and Ohio ODOT/OGRIP (cities, townships).</li>
        <li>The map names general-purpose governments only; special districts (library, parks, transit, etc.) also levy taxes and are not shown.</li>
        <li>Income tax follows where you work, not only where you live, so it isn't fully captured by a residence map.</li>
      </ul>
      <p><strong>Accuracy &amp; corrections.</strong> These maps are our best effort to represent Ohio's taxing jurisdictions and tax data accurately from public sources (Ohio Department of Taxation, U.S. Census/TIGER, Ohio ODOT/OGRIP). With thousands of overlapping governments, some inaccuracies are inevitable. If you find an error, please report it to <a href="mailto:lade.10@osu.edu">lade.10@osu.edu</a> and we'll correct it.</p>
      <p class="last-updated">Last updated: June 25, 2026</p>
    </section>
  </div>
</article>

<script src="{{ '/assets/js/copy-citation.js' | relative_url }}" defer></script>
