---
layout: default
title: "Ohio CDL crop change explorer"
permalink: /data/insights/ohio-cdl-crop-change/
description: "Interactive map of Ohio Cropland Data Layer classes and crop changes from 2006 to 2025."
---

<style>
  .cdl-app-section {
    max-width: none;
  }

  .cdl-app-section h2,
  .cdl-app-section > p {
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
  }

  .cdl-map-frame {
    width: calc(100vw - 2rem);
    max-width: none;
    height: calc(90svh - 5.4rem);
    min-height: 34rem;
    margin-left: calc(50% - 50vw + 1rem);
  }

  @media (max-width: 760px) {
    .cdl-map-frame {
      width: 100%;
      min-height: 32rem;
      margin-left: 0;
    }
  }
</style>

<article class="page">
  <header class="page-header">
    <h1>Ohio CDL crop change explorer</h1>
    <p class="page-subtitle">Interactive map of Ohio Cropland Data Layer classes and crop changes from 2006 to 2025.</p>
    <div class="page-meta">
      <p><strong>Authors:</strong> <a href="https://jingke-wu.github.io/">Jingke Wu</a>, <a href="https://gabe-lade.github.io/">Gabriel E. Lade</a>, <a href="https://sites.google.com/view/zhiningsun">Zhining Sun</a>, and <a href="https://cfaes.osu.edu/person/ani-katchova">Ani Katchova</a>.</p>
    </div>
  </header>

  <div class="page-content">
    <p class="section-intro">
      This tool uses USDA NASS Cropland Data Layer rasters to map Ohio crop and land-cover classes across 2006&ndash;2025. It supports single-year land-cover views and two-year change comparisons, with statewide and county acreage summaries for individual CDL classes and agricultural crop groups.
    </p>

    <section class="data-section cdl-app-section">
      <h2>Interactive map</h2>
      <p>
        Use Land cover mode to inspect CDL classes in a selected year, or switch to Change mode to compare a begin and end year. Class filters highlight major crops and CDL classes, while county boundaries let you inspect local acreage trends and class composition.
      </p>

      <iframe
        id="cdl-frame"
        class="insight-map-frame cdl-map-frame"
        src="{{ '/assets/data-insights/ohio-cdl-crop-change/index.html' | relative_url }}"
        title="Ohio CDL crop change interactive map"
        loading="lazy"></iframe>
    </section>

    <section class="data-section">
      <h2>What the explorer shows</h2>
      <p>
        The explorer is designed for comparing where specific crop and land-cover classes appear across Ohio and how those classes shift over time. It combines statewide raster views with county summaries so users can move between broad spatial patterns and local acreage totals.
      </p>
    </section>

    <section class="data-section">
      <h2>Sources and notes</h2>
      <ul class="notes-list">
        <li>The source product is USDA NASS Cropland Data Layer for Ohio from 2006&ndash;2025.</li>
        <li>Source rasters are 56 m in 2006&ndash;2007 and 30 m in 2008&ndash;2025; acreage is calculated from native source pixel area before web reprojection.</li>
        <li>County metrics are computed by rasterizing Ohio county polygons on the matching source grid and counting pixels by county and CDL class.</li>
      </ul>
      <p class="last-updated">Last updated: June 16, 2026</p>
    </section>
  </div>
</article>
