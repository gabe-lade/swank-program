---
layout: data-insight
title: "Ohio Urbanization"
permalink: /data/insights/ohio-urbanization-rural-urban-fringe/
description: "A Data Insights explainer on Ohio urbanization and the rural-urban fringe."
eyebrow: "Interactive maps"
topic: "Urbanization"
subtitle: "Interactive maps of where Ohio's urban footprint expanded from 2000 to 2020."
updated: "June 16, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Jingke Wu"
    url: "https://jingke-wu.github.io/"
intro:
  - "Urban growth often appears first at the rural-urban fringe, where formerly rural places begin to take on urban land use and housing patterns. The two maps below identify Ohio's urban and rural areas using two different lenses, and let you watch the fringe move outward from 2000 to 2020."
blocks:
  - type: heading
    id: "two-ways"
    text: "Two ways to measure \"urban\""
  - type: para
    text: "Both maps draw on small Census geographies, but they ask different questions:"
  - type: labelledBullets
    items:
      - label: "Census block"
        text: "&mdash; the smallest unit the Census Bureau reports, roughly a single city block (tens to a few hundred people). The first map classifies each block by whether the people living there are counted as urban, so it tracks <em>where urban population actually is</em>."
      - label: "Census block group"
        text: "&mdash; a cluster of blocks (about 600&ndash;3,000 people). The second map classifies each block group by <em>housing density</em>, so it tracks <em>where land is built up</em>, even before population counts catch up."
  - type: para
    text: "Comparing the two is the interesting part: the population lens shows where people are, while the density lens often shows the built-up fringe expanding a step ahead of it."
  - type: map
    id: "map-population"
    heading: "Urban and rural areas by population (Census blocks)"
    desc: "A block is classified as <strong>Urban</strong> if any of its population is counted as urban, and otherwise <strong>Rural</strong>. <strong>Rural &rarr; Urban</strong> marks blocks that flipped from rural in the previous decade to urban in the selected decade. Use the layer control to switch between 2000, 2010, and 2020."
    file: "map1_urban_areas.html"
    embed: "/assets/data-insights/ohio-urbanization-rural-urban-fringe/map1_urban_areas.html"
    title: "Ohio urban rural classification map on Census blocks"
  - type: map
    id: "map-density"
    heading: "Urban and rural areas by housing density (Census block groups)"
    desc: "A block group is classified as <strong>Urban</strong> when it has at least 200 housing units per square mile, and otherwise <strong>Rural</strong>. <strong>Rural &rarr; Urban</strong> marks block groups that crossed that threshold between the previous decade and the selected decade. Use the layer control to switch between 2000, 2010, and 2020."
    file: "map5_CBG_2000-2020.html"
    embed: "/assets/data-insights/ohio-urbanization-rural-urban-fringe/map5_CBG_2000-2020.html"
    title: "Ohio urban rural classification map on Census block groups"
use_cite:
  heading: "Use &amp; cite these maps"
  rows:
    - label: "Best for:"
      text: "residents, local officials, and researchers tracking urban growth and the rural-urban fringe."
    - label: "How to use:"
      text: "zoom to your community on either map, use each map's layer control to switch between 2000, 2010, and 2020, and compare the two lenses below. Read small boundary changes cautiously &mdash; the maps are best for broad patterns."
citation: "Lade, Gabriel E., and Jingke Wu. \"Ohio Urbanization.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
related:
  heading: "Read more"
  items:
    - label: "Where Is the Rural-Urban Fringe?"
      url: "https://gelade1.substack.com/p/where-is-the-rural-urban-fringe"
    - label: "How Much of Ohio Has Urbanized?"
      url: "https://gelade1.substack.com/p/how-much-of-ohio-has-urbanized"
    - label: "The Rural-Urban Fringe Is Growing"
      url: "https://gelade1.substack.com/p/the-rural-urban-fringe-is-growing"
sources:
  - "All years are shown on 2010 Census block and block group boundaries so that changes across decades are easier to compare."
  - "The population map uses Census urban and rural population counts; 2000 and 2020 values are interpolated to 2010 block boundaries."
  - "The housing-density map calculates housing units per square mile; 2000 and 2020 housing units are crosswalked to 2010 block group boundaries using NHGIS crosswalks."
---
