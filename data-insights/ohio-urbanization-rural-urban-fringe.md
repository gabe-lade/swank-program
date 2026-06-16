---
layout: default
title: "Ohio Urbanization"
permalink: /data/insights/ohio-urbanization-rural-urban-fringe/
description: "A Data Insights explainer on Ohio urbanization and the rural-urban fringe."
---

<article class="page">
  <header class="page-header">
    <h1>Ohio Urbanization</h1>
    <p class="page-subtitle">Interactive maps of where Ohio's urban footprint expanded from 2000 to 2020.</p>
    <div class="page-meta">
      <p><strong>Authors:</strong> <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a> and <a href="https://jingke-wu.github.io/">Jingke Wu</a>.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      Urban growth often appears first at the rural-urban fringe, where formerly rural places begin to take on urban land use and housing patterns. The two maps below identify Ohio's urban and rural areas using two different lenses, and let you watch the fringe move outward from 2000 to 2020.
    </p>

    <section class="data-section">
      <h2>Two ways to measure "urban"</h2>
      <p>
        Both maps draw on small Census geographies, but they ask different questions:
      </p>
      <ul class="notes-list">
        <li><strong>Census block</strong> &mdash; the smallest unit the Census Bureau reports, roughly a single city block (tens to a few hundred people). The first map classifies each block by whether the people living there are counted as urban, so it tracks <em>where urban population actually is</em>.</li>
        <li><strong>Census block group</strong> &mdash; a cluster of blocks (about 600&ndash;3,000 people). The second map classifies each block group by <em>housing density</em>, so it tracks <em>where land is built up</em>, even before population counts catch up.</li>
      </ul>
      <p>
        Comparing the two is the interesting part: the population lens shows where people are, while the density lens often shows the built-up fringe expanding a step ahead of it.
      </p>
    </section>

    <section class="data-section">
      <h2>Urban and rural areas by population (Census blocks)</h2>
      <p>
        A block is classified as <strong>Urban</strong> if any of its population is counted as urban, and otherwise <strong>Rural</strong>. <strong>Rural &rarr; Urban</strong> marks blocks that flipped from rural in the previous decade to urban in the selected decade. Use the layer control to switch between 2000, 2010, and 2020.
      </p>

      <iframe
        class="insight-map-frame"
        src="{{ '/assets/data-insights/ohio-urbanization-rural-urban-fringe/map1_urban_areas.html' | relative_url }}"
        title="Ohio urban rural classification map on Census blocks"
        loading="lazy">
      </iframe>
    </section>

    <section class="data-section">
      <h2>Urban and rural areas by housing density (Census block groups)</h2>
      <p>
        A block group is classified as <strong>Urban</strong> when it has at least 200 housing units per square mile, and otherwise <strong>Rural</strong>. <strong>Rural &rarr; Urban</strong> marks block groups that crossed that threshold between the previous decade and the selected decade. Use the layer control to switch between 2000, 2010, and 2020.
      </p>

      <iframe
        class="insight-map-frame"
        src="{{ '/assets/data-insights/ohio-urbanization-rural-urban-fringe/map5_CBG_2000-2020.html' | relative_url }}"
        title="Ohio urban rural classification map on Census block groups"
        loading="lazy">
      </iframe>
    </section>

    <section class="data-section">
      <h2>Read more</h2>
      <ul class="notes-list">
        <li><a href="https://gelade1.substack.com/p/where-is-the-rural-urban-fringe">Where Is the Rural-Urban Fringe?</a></li>
        <li><a href="https://gelade1.substack.com/p/how-much-of-ohio-has-urbanized">How Much of Ohio Has Urbanized?</a></li>
        <li><a href="https://gelade1.substack.com/p/the-rural-urban-fringe-is-growing">The Rural-Urban Fringe Is Growing</a></li>
      </ul>
    </section>

    <section class="data-section">
      <h2>Sources and notes</h2>
      <ul class="notes-list">
        <li>All years are shown on 2010 Census block and block group boundaries so that changes across decades are easier to compare.</li>
        <li>The population map uses Census urban and rural population counts; 2000 and 2020 values are interpolated to 2010 block boundaries.</li>
        <li>The housing-density map calculates housing units per square mile; 2000 and 2020 housing units are crosswalked to 2010 block group boundaries using NHGIS crosswalks.</li>
      </ul>
      <p class="last-updated">Last updated: June 16, 2026</p>
    </section>
  </div>
</article>
