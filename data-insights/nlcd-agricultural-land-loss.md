---
layout: data-insight
title: "Tracking agricultural land loss with NLCD"
permalink: /data/insights/nlcd-agricultural-land-loss/
description: "Interactive map of Ohio agricultural land-cover change from 1985 to 2024, built from Annual NLCD land-cover rasters."
eyebrow: "Interactive map"
topic: "Agriculture"
subtitle: "Interactive map of Ohio agricultural land-cover change from 1985 to 2024."
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
stats:
  - value: "13.6M acres"
    label: "Agricultural land in 1985 (13,640,765)"
  - value: "13.0M acres"
    label: "Agricultural land in 2024 (12,954,971)"
  - value: "686K acres"
    label: "Net loss of agricultural land, 1985&ndash;2024 &mdash; a 5.0% decline"
  - value: "726K acres"
    label: "Farmland converted to development &mdash; 77% of all gross agricultural-land loss"
stats_note: "Statewide totals computed from the annual NLCD data behind the map. Agricultural land is NLCD Pasture/Hay (81) plus Cultivated Crops (82); acres are counted from the original 30&nbsp;m pixels. Counties with the most net farmland loss: Franklin (about 53,000 acres), Delaware (38,000), Warren (34,000), Butler (33,000), and Lorain (22,000). Source: Annual National Land Cover Database (MRLC/USGS), 1985&ndash;2024, processed by the Swank Program. Updated June 2026."
intro:
  - "This tool uses Annual NLCD land-cover rasters to compare agricultural land across any pair of years from 1985 to 2024. It maps gross loss, gross gain, net loss, and agricultural land converted to development, with statewide and county-level summaries."
blocks:
  - type: map
    id: "interactive-map"
    heading: "Interactive map"
    desc: "Use the year controls to compare land cover between two years. The grid view shows pixel-level agricultural transitions, while the county view summarizes change by county and lets you inspect local trends and destination land-cover classes."
    file: "index.html"
    embed: "/assets/data-insights/nlcd-agricultural-land-loss/index.html"
    title: "Ohio agricultural land loss interactive map"
    frame_id: "nlcd-frame"
    autoresize: true
use_cite:
  heading: "Use this map"
  rows:
    - label: "Best for:"
      text: "journalists, local officials, and researchers tracking farmland conversion in Ohio."
    - label: "What it shows:"
      text: "agricultural land-cover change across Ohio from 1985 to 2024 from annual NLCD satellite data &mdash; gross loss, gross gain, net loss, and farmland converted to development, statewide and by county."
    - label: "Caveat:"
      text: "land cover is classified from remotely sensed imagery; it is not the same as parcel ownership, zoning, or farmland-program enrollment, and small year-to-year changes can reflect classification noise."
citation: "Wu, Jingke, Gabriel E. Lade, Zhining Sun, and Ani Katchova. \"Tracking Agricultural Land Loss with NLCD.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026. Data from the Annual National Land Cover Database (MRLC/USGS), 1985&ndash;2024."
download:
  label: "annual agricultural and developed land by county and year (CSV)"
  url: "/assets/data-insights/nlcd-agricultural-land-loss/data/annual_region_metrics.csv"
related:
  heading: "Related reports"
  lead: "This tool builds on work outlined in two reports from the Ohio State University Department of Agricultural, Environmental, and Development Economics:"
  items:
    - label: "Agricultural Land Lost to Development in Ohio"
      url: "https://aede.osu.edu/sites/default/files/2026-04/Katchova_AgLandLost_Q32025.pdf"
      note: "(Katchova, Sun, &amp; Cohen, July 2025)."
    - label: "Measuring Agricultural Land and Land Loss in Ohio: Why the Numbers Differ Across Datasets"
      url: "https://aede.osu.edu/sites/default/files/2026-06/Katchova%20and%20Lade_Ag%20Land%20and%20Land%20Loss.pdf"
      note: "(Katchova, Lade, Sun, &amp; Wu, June 2026)."
sources:
  - "The source product is MRLC/USGS Annual NLCD Collection 1 Version 1 land cover for 1985&ndash;2024."
  - "Agricultural land is defined as NLCD 81 Pasture/Hay plus 82 Cultivated Crops."
  - "Developed land includes NLCD 21, 22, 23, and 24."
  - "Area metrics are counted from the original 30 m Albers Equal Area NLCD pixels; the web map display is not used for area calculations."
---
