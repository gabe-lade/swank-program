---
layout: default
title: "Ohio urbanization rural urban fringe"
permalink: /data/insights/ohio-urbanization-rural-urban-fringe/
description: "A Data Insights explainer on Ohio urbanization and the rural urban fringe."
---

<article class="page">
  <header class="page-header">
    <h1>Ohio urbanization rural urban fringe</h1>
    <p class="page-subtitle">Interactive maps of where Ohio's urban footprint expanded from 2000 to 2020.</p>
    <div class="page-meta">
      <p><strong>Authors:</strong> <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a> and <a href="https://jingke-wu.github.io/">Jingke Wu</a>.</p>
      <p><strong>Programming:</strong> <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a> and <a href="https://jingke-wu.github.io/">Jingke Wu</a>.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      Urban growth often appears first at the rural urban fringe, where formerly rural places begin to take on urban land use and housing patterns. These maps compare two ways of identifying Ohio's urban and rural areas over time: one based on Census urban and rural population counts at the block level, and one based on housing density at the block group level.
    </p>

    <section class="data-section">
      <h2>Block based Census urban rural classification</h2>
      <p>
        This map shows county-dissolved urban, rural, and rural-to-urban areas for 2000, 2010, and 2020 on 2010 Census block boundaries. A block is classified as Urban if its urban population is greater than zero; otherwise it is classified as Rural if its rural population is greater than zero. The 2000 and 2020 results are interpolated to 2010 block boundaries, and Rural to Urban marks areas that move from rural in the previous decade to urban in the selected decade.
      </p>

      <iframe
        class="insight-map-frame"
        src="{{ '/assets/data-insights/ohio-urbanization-rural-urban-fringe/map1_urban_areas.html' | relative_url }}"
        title="Ohio urban rural classification map on Census blocks"
        loading="lazy">
      </iframe>
    </section>

    <section class="data-section">
      <h2>Block group housing density classification</h2>
      <p>
        This map shows county-dissolved urban, rural, and rural-to-urban areas for 2000, 2010, and 2020 on 2010 Census block group boundaries. Housing density is calculated as housing units divided by area in square miles, and a 2010 block group is classified as Urban when housing density is at least 200 housing units per square mile; otherwise it is classified as Rural. The 2000 and 2020 housing units are crosswalked to 2010 block group boundaries using NHGIS crosswalks, and Rural to Urban marks areas that move from rural in the previous decade to urban in the selected decade under this density-based definition.
      </p>

      <iframe
        class="insight-map-frame"
        src="{{ '/assets/data-insights/ohio-urbanization-rural-urban-fringe/map5_CBG_2000-2020.html' | relative_url }}"
        title="Ohio urban rural classification map on Census block groups"
        loading="lazy">
      </iframe>
    </section>

    <section class="data-section">
      <h2>Sources and notes</h2>
      <ul class="notes-list">
        <li>Geography is shown on 2010 Census block or block group boundaries so that changes across years are easier to compare.</li>
        <li>The block based map uses Census urban and rural population counts.</li>
        <li>The block group map uses housing units, land area, and NHGIS crosswalks to compare 2000, 2010, and 2020 on a common geography.</li>
      </ul>
      <p class="last-updated">Last updated: June 10, 2026</p>
    </section>
  </div>
</article>
