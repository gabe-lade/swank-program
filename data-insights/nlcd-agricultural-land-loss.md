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
      <p><strong>Author:</strong> <a href="https://jingke-wu.github.io/">Jingke Wu</a>.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      This tool uses Annual NLCD land-cover rasters to compare agricultural land across any pair of years from 1985 to 2024. It maps gross loss, gross gain, net loss, and agricultural land converted to development, with statewide and county-level summaries.
    </p>

    <section class="data-section">
      <h2>Interactive map</h2>
      <p>
        Use the year controls to compare land cover between two years. The grid view shows pixel-level agricultural transitions, while the county view summarizes change by county and lets you inspect local trends and destination land-cover classes.
      </p>

      <iframe
        class="insight-map-frame"
        src="{{ '/assets/data-insights/nlcd-agricultural-land-loss/index.html' | relative_url }}"
        title="Ohio agricultural land loss interactive map"
        loading="lazy">
      </iframe>
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
