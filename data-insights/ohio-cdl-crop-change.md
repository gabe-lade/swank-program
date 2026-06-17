---
layout: default
title: "Ohio CDL crop change explorer"
permalink: /data/insights/ohio-cdl-crop-change/
description: "Interactive map of Ohio Cropland Data Layer classes and crop changes from 2006 to 2025."
---

<article class="page">
  <header class="page-header">
    <h1>Ohio CDL crop change explorer</h1>
    <p class="page-subtitle">Interactive map of Ohio Cropland Data Layer (CDL) crop and land-cover classes, and how they changed from 2006 to 2025.</p>
    <div class="page-meta">
      <p><strong>Authors:</strong> <a href="https://jingke-wu.github.io/">Jingke Wu</a>, <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a>, <a href="https://sites.google.com/view/zhiningsun">Zhining Sun</a>, and <a href="https://cfaes.osu.edu/person/ani-katchova">Ani Katchova</a>.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      This tool uses USDA NASS Cropland Data Layer rasters to map Ohio crop and land-cover classes across 2006&ndash;2025. It supports single-year land-cover views and two-year change comparisons, with statewide and county acreage summaries for individual CDL classes and crop groups.
    </p>

    <div class="use-box">
      <h2>Use this map</h2>
      <p><strong>Best for:</strong> journalists, local officials, farmers, and researchers tracking Ohio's cropping patterns and agricultural land cover.</p>
      <p><strong>What it shows:</strong> where specific crops and land-cover classes — corn, soybeans, wheat, pasture, and more — appear across Ohio in any year from 2006 to 2025, and how they shift between any two years, with statewide and county acreage summaries.</p>
      <p><strong>Caveat:</strong> the Cropland Data Layer is classified from satellite imagery; accuracy varies by crop and year, and single-pixel or single-year changes can reflect classification noise rather than real land-use change. CDL classes are not the same as parcel ownership, planted-acreage surveys, or program enrollment.</p>
      <p><strong>Suggested citation:</strong></p>
      <div class="cite-block">
        <p class="cite-text" id="cdl-citation">Wu, Jingke, Gabriel E. Lade, Zhining Sun, and Ani Katchova. "Ohio CDL Crop Change Explorer." C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026. Data from the USDA NASS Cropland Data Layer, 2006–2025.</p>
        <button type="button" class="cite-copy" data-copy-target="cdl-citation">Copy citation</button>
      </div>
    </div>

    <section class="data-section">
      <h2>Interactive map</h2>
      <p>
        Use <strong>Land cover</strong> mode to inspect CDL classes in a selected year, or switch to <strong>Change</strong> mode to compare a begin and end year. Class filters highlight major crops and CDL classes, and the county view lets you inspect local acreage trends and class composition.
      </p>

      <iframe
        id="cdl-frame"
        class="insight-map-frame"
        src="{{ '/assets/data-insights/ohio-cdl-crop-change/index.html' | relative_url }}"
        title="Ohio CDL crop change interactive map"
        loading="lazy"></iframe>
    </section>

    <section class="data-section">
      <h2>Sources and notes</h2>
      <ul class="notes-list">
        <li>The source product is the USDA NASS Cropland Data Layer for Ohio, 2006&ndash;2025.</li>
        <li>Source rasters are 56 m in 2006&ndash;2007 and 30 m in 2008&ndash;2025; acreage is calculated from native source pixel area before web reprojection.</li>
        <li>County metrics are computed by rasterizing Ohio county polygons on the matching source grid and counting pixels by county and CDL class.</li>
      </ul>
      <p class="last-updated">Last updated: June 16, 2026</p>
    </section>
  </div>
</article>

<script>
  (function () {
    var frame = document.getElementById('cdl-frame');
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
