---
layout: data-insight
title: "Ohio CDL crop change explorer"
permalink: /data/insights/ohio-cdl-crop-change/
description: "Interactive map of Ohio Cropland Data Layer classes and crop changes from 2006 to 2025."
eyebrow: "Interactive map"
topic: "Agriculture"
subtitle: "Interactive map of Ohio Cropland Data Layer (CDL) crop and land-cover classes, and how they changed from 2006 to 2025."
updated: "June 16, 2026"
authors:
  - name: "Jingke Wu"
    url: "https://jingke-wu.github.io/"
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Zhining Sun"
    url: "https://sites.google.com/view/zhiningsun"
  - name: "Ani Katchova"
    url: "https://cfaes.osu.edu/person/ani-katchova"
intro:
  - "This tool uses USDA NASS Cropland Data Layer rasters to map Ohio crop and land-cover classes across 2006&ndash;2025. It supports single-year land-cover views and two-year change comparisons, with statewide and county acreage summaries for individual CDL classes and crop groups."
blocks:
  - type: map
    id: "interactive-map"
    heading: "Interactive map"
    desc: "Use <strong>Land cover</strong> mode to inspect CDL classes in a selected year, or switch to <strong>Change</strong> mode to compare a begin and end year. Class filters highlight major crops and CDL classes, and the county view lets you inspect local acreage trends and class composition."
    file: "index.html"
    embed: "/assets/data-insights/ohio-cdl-crop-change/index.html"
    title: "Ohio CDL crop change interactive map"
    frame_id: "cdl-frame"
    autoresize: true
use_cite:
  heading: "Use this map"
  rows:
    - label: "Best for:"
      text: "journalists, local officials, farmers, and researchers tracking Ohio's cropping patterns and agricultural land cover."
    - label: "What it shows:"
      text: "where specific crops and land-cover classes &mdash; corn, soybeans, wheat, pasture, and more &mdash; appear across Ohio in any year from 2006 to 2025, and how they shift between any two years, with statewide and county acreage summaries."
    - label: "Caveat:"
      text: "the Cropland Data Layer is classified from satellite imagery; accuracy varies by crop and year, and single-pixel or single-year changes can reflect classification noise rather than real land-use change. CDL classes are not the same as parcel ownership, planted-acreage surveys, or program enrollment."
citation: "Wu, Jingke, Gabriel E. Lade, Zhining Sun, and Ani Katchova. \"Ohio CDL Crop Change Explorer.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026. Data from the USDA NASS Cropland Data Layer, 2006&ndash;2025."
sources:
  - "The source product is the USDA NASS Cropland Data Layer for Ohio, 2006&ndash;2025."
  - "Source rasters are 56 m in 2006&ndash;2007 and 30 m in 2008&ndash;2025; acreage is calculated from native source pixel area before web reprojection."
  - "County metrics are computed by rasterizing Ohio county polygons on the matching source grid and counting pixels by county and CDL class."
---
