---
layout: data-insight
title: "Ohio Tax Explainer"
permalink: /data/insights/ohio-tax-explainer/
description: "An interactive guide to the state and local taxes Ohioans pay — and who actually collects them."
eyebrow: "Interactive map"
topic: "Taxes"
subtitle: "An interactive guide to the state and local taxes Ohioans pay &mdash; and who actually collects them."
updated: "July 17, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Alex Ryan"
stats:
  - value: "~$70B"
    label: "Annual state &amp; local tax collections (~$32B state, ~$38B local)"
  - value: "$25.2B"
    label: "Annual property tax &mdash; the single largest tax (~$2,140/resident)"
  - value: "~65%"
    label: "Share of the property tax that funds public schools"
  - value: "10+"
    label: "Governments that typically tax a single Ohio parcel"
  - value: "$0"
    label: "Property tax collected by the State of Ohio (it levies none)"
stats_note: "88 counties &middot; 900+ cities &amp; villages &middot; ~1,300 townships &middot; 600+ school districts. Source: Ohio Department of Taxation Tax Data Series; U.S. Census / ACS."
intro:
  - "This page collects the interactive maps and key numbers behind our newsletter series, \"Ohio's Taxes, Explained.\" Everything here is built from public Ohio Department of Taxation data."
  - "Ohioans pay a surprising number of overlapping taxes &mdash; to the state, a county, a city or township, a school district, and a cluster of special districts &mdash; and this is where we make that visible. We'll keep adding maps as the series continues."
blocks:
  - type: map
    id: "who-taxes-you"
    heading: "1 &middot; The stack &mdash; who taxes you?"
    desc: "Hover anywhere in Ohio to see the full stack of governments that can tax that spot. Cities and townships are mostly mutually exclusive (incorporated vs. unincorporated), so usually only one of those fills in. This map shows the big, general-purpose governments; libraries, parks, transit, and other special districts also tax the parcel and aren't drawn here."
    file: "who_taxes_you.html"
    embed: "/assets/data-insights/ohio-tax-explainer/who_taxes_you.html"
    title: "Map of the Ohio governments that tax a given location"
  - type: para
    text: "Every Ohio address sits under a stack of taxing governments &mdash; the state, a county, a city or a township, a school district, and a cluster of special districts. That stack, not any single tax, is what makes an Ohio tax bill hard to read. <a href=\"https://gelade1.substack.com/p/who-taxes-you-in-ohio\">Read piece 1 of the series &rarr;</a>"
  - type: heading
    id: "tax-menu"
    text: "2 &middot; The menu &mdash; what kinds of taxes?"
  - type: para
    text: "Those governments choose from a short menu. The state leans on a <strong>5.75% sales tax</strong> (with local add-ons on top) and a nearly flat <strong>2.75% income tax</strong> on income above ~$26,000, plus a small <strong>0.26% commercial-activity tax</strong> on business receipts. Local governments lean on the <strong>property tax</strong> &mdash; at $25.2B a year, the single largest tax Ohioans pay (the stat band above carries the headline numbers). <a href=\"https://gelade1.substack.com/p/what-kinds-of-taxes-do-we-pay-in\">Read piece 2 &rarr;</a>"
  - type: heading
    id: "authority-matrix"
    text: "3 &middot; The matrix &mdash; who can levy what?"
  - type: para
    text: "Ohio law hands each kind of government a different slice of that menu:"
  - type: para
    text: >-
      <table style="width:100%;border-collapse:collapse;margin:2px 0 10px;font-size:14px;line-height:1.45;background:#fff;border:1px solid #E5E2DC;border-radius:10px;overflow:hidden;">
      <thead><tr>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #E5E2DC;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#9A968D;font-weight:500;">Government</th>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #E5E2DC;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#9A968D;font-weight:500;">Property</th>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #E5E2DC;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#9A968D;font-weight:500;">Income</th>
      <th style="text-align:left;padding:10px 12px;border-bottom:1px solid #E5E2DC;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#9A968D;font-weight:500;">Sales</th>
      </tr></thead>
      <tbody>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">State of Ohio</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash; <span style="display:block;font-size:12px;">levies none</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">2.75% above ~$26k</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">5.75%</span></td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">Counties</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">countywide millage</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">permissive add-on</span></td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">Cities &amp; villages</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">small millage</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">place-of-work</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">Townships</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">their only tax</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">School districts</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">main funding source</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">~1 in 3, voter-approved</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td></tr>
      <tr><td style="padding:9px 12px;font-weight:600;color:#33302B;">Special districts</td><td style="padding:9px 12px;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">library, parks, zoo&hellip;</span></td><td style="padding:9px 12px;color:#B9B5AC;">&mdash;</td><td style="padding:9px 12px;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">transit only</span></td></tr>
      </tbody>
      </table>
  - type: map
    id: "authority-map"
    heading: "Where those choices land"
    desc: "Four switchable layers &mdash; counties, municipalities, school districts, townships &mdash; each shaded by its headline tax. Hover (or tap) any unit for its name, the taxes it levies, and the relevant rates and collections. Read sales tax as place-of-sale and income tax as place-of-work, not where residents live."
    file: "authority_tax_maps.html"
    embed: "/assets/data-insights/ohio-tax-explainer/authority_tax_maps.html"
    frame_id: "authority-frame"
    title: "Interactive map of which taxes each Ohio local government levies"
  - type: para
    text: "Two asymmetries do most of the work here. Most local governments can levy <em>only</em> the property tax &mdash; the income and sales taxes belong to a select few. And rates are local decisions that vary enormously: on the school-district layer, 369 of Ohio's 611 districts sit at the state's 20-mill floor for residential property (the red outlines). Piece 3 of the series walks through the full matrix &mdash; link coming when it publishes."
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, local officials, journalists, and researchers who want to see who taxes a given place and how a tax bill is split."
    - label: "How to use:"
      text: "Hover (or tap on mobile) anywhere in Ohio to see every general-purpose government that taxes that spot &mdash; your county, your city or township, and your school district, with the state above them all. Read it as \"which governments tax here,\" not as an exact dollar bill."
    - label: "Authority map:"
      text: "Use the buttons to switch layers (counties, municipalities, school districts, townships) and hover any unit for the taxes it levies and its rates. Read sales tax as place-of-sale and income tax as place-of-work. The &#187; button tucks the panel away for a full-width map."
citation: "Lade, Gabriel E., and Alex Ryan. \"Ohio Tax Explainer.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
related:
  heading: "Read more"
  items:
    - label: "\"Who Taxes You in Ohio?\" (Substack)"
      url: "https://gelade1.substack.com/p/who-taxes-you-in-ohio"
    - label: "\"What Kinds of Taxes Do We Pay in Ohio?\" (Substack)"
      url: "https://gelade1.substack.com/p/what-kinds-of-taxes-do-we-pay-in"
sources:
  - "Tax totals: Ohio Department of Taxation Tax Data Series. Boundaries: U.S. Census TIGER (counties, school districts) and Ohio ODOT/OGRIP (cities, townships)."
  - "The map names general-purpose governments only; special districts (library, parks, transit, etc.) also levy taxes and are not shown."
  - "Income tax follows where you work, not only where you live, so it isn't fully captured by a residence map."
  - "Authority-map vintages: property rates TY2025 (incl. the Class I 20-mill Floor Rate column); school-district income FY2026 (SD-2, Q4); municipal income CY2024 (LG-11); county permissive sales/use CY2025 (S-1). County population: ACS 2019&ndash;23; municipal per-resident figures use the boundary file's 2010 population (labeled in the panel)."
correction: "<strong>Accuracy &amp; corrections.</strong> These maps are our best effort to represent Ohio's taxing jurisdictions and tax data accurately from public sources (Ohio Department of Taxation, U.S. Census/TIGER, Ohio ODOT/OGRIP). With thousands of overlapping governments, some inaccuracies are inevitable. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
