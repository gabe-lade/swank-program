---
layout: data-insight
title: "Ohio Tax Explainer"
permalink: /data/insights/ohio-tax-explainer/
description: "Who taxes you in Ohio, what they charge, and where the money goes — in five maps and charts."
eyebrow: "Interactive map"
topic: "Taxes"
subtitle: "Who taxes you in Ohio, what they charge, and where the money goes &mdash; in five maps and charts."
updated: "August 25, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Alex Ryan"
stats:
  - value: "$72B"
    label: "State and local taxes collected each year ($33B state, $39B local)"
  - value: "$22.6B"
    label: "Real property tax, the single largest tax (about $1,915 per resident)"
  - value: "~67%"
    label: "Share of property tax that goes to school districts"
  - value: "10+"
    label: "Governments that tax a typical Ohio address"
  - value: "$0"
    label: "Property tax collected by the State of Ohio (it charges none)"
stats_note: "88 counties &middot; 900+ cities and villages &middot; about 1,300 townships &middot; 600+ school districts. Source: Ohio Department of Taxation Tax Data Series; U.S. Census / ACS."
intro:
  - "Every Ohio address is taxed by several governments at once: the state, a county, a city or township, a school district, and a few special districts. That's why an Ohio tax bill is hard to read."
  - "This page collects the maps and key numbers behind our newsletter series, <em>Ohio's Taxes, Explained</em>. Everything is built from public Ohio Department of Taxation data. We'll add to it as the series continues."
blocks:
  - type: map
    id: "who-taxes-you"
    heading: "1 &middot; Who taxes you?"
    desc: "Hover anywhere in Ohio to see every government that can tax that spot. You'll usually see a city <em>or</em> a township, not both &mdash; cities cover incorporated land, townships the rest. The map shows the main governments only; libraries, parks, transit, and other special districts also tax the same address but aren't drawn."
    file: "who_taxes_you.html"
    embed: "/assets/data-insights/ohio-tax-explainer/who_taxes_you.html"
    title: "Map of the Ohio governments that tax a given location"
  - type: para
    text: "Every Ohio address sits under a stack of taxing governments. No single tax is the problem &mdash; it's the stack. <strong><a href=\"https://gelade1.substack.com/p/who-taxes-you-in-ohio\">Read the full piece: Who taxes you in Ohio? &rarr;</a></strong>"
  - type: heading
    id: "tax-menu"
    text: "2 &middot; What kinds of taxes?"
  - type: para
    text: "Those governments choose from a short menu. The state relies on a <strong>5.75% sales tax</strong> (counties add to it) and a nearly flat <strong>2.75% income tax</strong> on income above about $26,000, plus a small <strong>0.26% tax on business receipts</strong>. Local governments rely on the <strong>property tax</strong> &mdash; at $22.6 billion a year, the largest tax Ohioans pay. <strong><a href=\"https://gelade1.substack.com/p/what-kinds-of-taxes-do-we-pay-in\">Read the full piece: What kinds of taxes do we pay in Ohio? &rarr;</a></strong>"
  - type: heading
    id: "authority-matrix"
    text: "3 &middot; Who can charge which tax?"
  - type: para
    text: "Ohio law gives each type of government a different slice of that menu:"
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
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">State of Ohio</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash; <span style="display:block;font-size:12px;">none</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">2.75% above ~$26k</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">5.75%</span></td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">Counties</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">countywide rate</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">add-on to state rate</span></td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">Cities &amp; villages</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">small rate</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">where you work</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">Townships</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">their only tax</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td></tr>
      <tr><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;font-weight:600;color:#33302B;">School districts</td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">main funding source</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">about 1 in 3, voter-approved</span></td><td style="padding:9px 12px;border-bottom:1px solid #F2EFE9;color:#B9B5AC;">&mdash;</td></tr>
      <tr><td style="padding:9px 12px;font-weight:600;color:#33302B;">Special districts</td><td style="padding:9px 12px;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">library, parks, zoo&hellip;</span></td><td style="padding:9px 12px;color:#B9B5AC;">&mdash;</td><td style="padding:9px 12px;color:#33302B;">&#10003; <span style="display:block;font-size:12px;color:#8A8880;">transit only</span></td></tr>
      </tbody>
      </table>
  - type: para
    text: "<strong>A note on rates.</strong> Property-tax rates are quoted in <strong>mills</strong> &mdash; dollars per $1,000 of <em>assessed</em> value, which in Ohio is 35% of market value. One mill works out to about $35 a year per $100,000 of home value. The <em>effective</em> rate is what a homeowner actually pays after state reduction factors (HB 920) trim the voted rate. That's the number on the map below, and the one to compare across places."
  - type: map
    id: "authority-map"
    heading: "3b &middot; Map: tax rates by government"
    desc: "Four layers &mdash; counties, cities and villages, school districts, townships &mdash; each shaded by the tax rate it charges. Hover or tap any shape for its name and rates."
    file: "authority_tax_maps.html"
    embed: "/assets/data-insights/ohio-tax-explainer/authority_tax_maps.html"
    frame_id: "authority-frame"
    title: "Interactive map of which taxes each Ohio local government levies"
  - type: para
    text: "Two patterns stand out. Most local governments can charge only the property tax; income and sales taxes are limited to a few. And rates vary a lot from place to place &mdash; on the school-district layer, 366 of the 606 districts we can match sit at the state's 20-mill minimum for homes (the red outlines). <strong><a href=\"https://gelade1.substack.com/p/what-can-each-ohio-government-actually\">Read the full piece: What can each Ohio government actually tax? &rarr;</a></strong>"
  - type: heading
    id: "the-money"
    text: "4 &middot; How much, and who gets it?"
  - type: para
    text: "Ohio's state and local governments collect about <strong>$72 billion</strong> a year in taxes &mdash; roughly <strong>$33 billion</strong> by the state and <strong>$39 billion</strong> locally, or about $6,100 per resident. Local governments collect more than the state does, and they collect it differently: three-quarters of the state's total is sales and income tax, while <strong>58% of local tax revenue is property tax</strong>. Follow a property-tax dollar and about <strong>67 cents goes to a school district</strong>, 2 to a vocational school district, 15 to the county, 7 to a township, 5 to special districts like libraries and parks, and 4 to a city or village. <strong><a href=\"https://gelade1.substack.com/p/who-collects-ohios-72-billion-in\">Read the full piece: Who collects Ohio's $72 billion in taxes? &rarr;</a></strong>"
  - type: map
    id: "county-collections"
    heading: "4b &middot; Map: where each tax is collected"
    desc: "County totals for the three biggest local taxes, with a per-resident toggle. Switch layers and different counties light up: shopping centers for sales tax, job centers for city income tax, and a third pattern for property tax. Keep in mind that where a tax is <em>collected</em> isn't where it's <em>paid</em> &mdash; sales tax is collected where you shop and city income tax where you work, not where you live."
    file: "ohio_tax_collections.html"
    embed: "/assets/data-insights/ohio-tax-explainer/ohio_tax_collections.html"
    frame_id: "collections-frame"
    title: "Map of Ohio local tax collections by county"
  - type: para
    text: "Two things to know before adding up the counties. The property layer is <strong>real property only</strong> ($22.6B); it leaves out the separate $2.6B tax on utility equipment. The sales layer is the <strong>county</strong> share only ($3.0B); Ohio's eleven regional transit authorities collect about $1.0B more, but their districts cross county lines, so they can't be assigned to one county. The map says both on screen."
  - type: heading
    id: "what-it-buys"
    text: "5 &middot; What it buys"
  - type: para
    text: "Ohio's local governments spent about <strong>$68.6 billion</strong> in 2022. That's a different total from the $39 billion in local taxes above, because spending also draws on state and federal aid, fees, and charges. <strong>Education is 43% of it</strong> &mdash; $29.6 billion, almost all in school districts, and more than the next five services combined. After administration (a catch-all, 12%), the largest single services are police and utilities at about 5.5% each. Viewed by government instead of by service, school districts account for <strong>42% of all local spending</strong>, well ahead of cities and villages (24%)."
  - type: map
    id: "spending-chart"
    heading: "5b &middot; Chart: where each dollar goes"
    desc: "Toggle between spending by government (see how completely education dominates the school-district bar) and spending by service (see which government does each job). Hover any segment for the dollar amount and share."
    file: "ohio_tax_spending.html"
    embed: "/assets/data-insights/ohio-tax-explainer/ohio_tax_spending.html"
    frame_id: "spending-frame"
    autoresize: true
    title: "Chart of Ohio local government spending by government type and service category"
  - type: para
    text: "This is spending, not tax collections &mdash; a different Census survey, a different year (2022), and a wider funding base than taxes alone. Don't add it to the $72 billion above. <strong><a href=\"https://gelade1.substack.com/p/what-do-ohio-taxes-buy\">Read the full piece: What do Ohio taxes buy? &rarr;</a></strong>"
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, local officials, journalists, and researchers who want to see who taxes a given place and how a tax bill is split."
    - label: "Who taxes you (map 1):"
      text: "Hover, or tap on a phone, anywhere in Ohio to see every general-purpose government that taxes that spot. Read it as \"which governments tax here,\" not as a dollar bill."
    - label: "Tax rates (map 3b):"
      text: "Pick a layer, then hover any shape for the rates it charges. The &#187; button tucks the panel away for a wider map."
    - label: "Collections (map 4b):"
      text: "Pick a tax, toggle per resident, hover a county."
    - label: "Spending (chart 5b):"
      text: "Toggle by government or by service; hover a segment for the amount and share. This is 2022 spending from all sources, not tax collections."
citation: "Lade, Gabriel E., and Alex Ryan. \"Ohio Tax Explainer.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
related:
  heading: "Read more"
  items:
    - label: "\"Who Taxes You in Ohio?\" (Substack)"
      url: "https://gelade1.substack.com/p/who-taxes-you-in-ohio"
    - label: "\"What Kinds of Taxes Do We Pay in Ohio?\" (Substack)"
      url: "https://gelade1.substack.com/p/what-kinds-of-taxes-do-we-pay-in"
    - label: "\"What Can Each Ohio Government Actually Tax?\" (Substack)"
      url: "https://gelade1.substack.com/p/what-can-each-ohio-government-actually"
    - label: "\"Who Collects Ohio's $72 Billion in Taxes?\" (Substack)"
      url: "https://gelade1.substack.com/p/who-collects-ohios-72-billion-in"
    - label: "\"What Do Ohio Taxes Buy?\" (Substack)"
      url: "https://gelade1.substack.com/p/what-do-ohio-taxes-buy"
sources:
  - "Tax totals: Ohio Department of Taxation Tax Data Series. Boundaries: U.S. Census TIGER (counties, school districts) and Ohio ODOT/OGRIP (cities, townships)."
  - "The map names general-purpose governments only; special districts (library, parks, transit, etc.) also levy taxes and are not shown."
  - "Income tax follows where you work, not only where you live, so it isn't fully captured by a residence map."
  - "Authority-map vintages: property rates TY2025 (incl. the Class I 20-mill Floor Rate column); school-district income-tax rate FY2026 (SD-2, Q4); municipal income-tax rate CY2024 (LG-11). The map shows rates only, not collections; ODT does not publish a per-county permissive sales-tax rate table (Table S-1 reports dollars collected, not the rate), so the county layer is shaded by county property rate instead, and the map says so."
  - "County-collections map vintages: real property taxes charged TY2025 (PD-23, Class I + Class II, net of HB 920 reduction factors); county permissive sales/use CY2025 (S-1); municipal income CY2024 (LG-11); population ACS 2020&ndash;24. The property layer excludes the public-utility tangible personal property tax ($2.6B), and the sales layer excludes the regional transit authorities ($1.0B), which levy across county lines."
  - "Collections totals are statewide sums across all local governments in a county, not any one government's take, and the three taxes have different bases &mdash; do not compare the layers directly."
  - "Spending chart: U.S. Census Bureau Survey of State &amp; Local Government Finances, 2022 (Government Finance Database). Covers Ohio's local governments (counties, municipalities, townships, school districts, special districts) only &mdash; state direct spending is excluded. Spending is funded from all revenue sources (taxes, fees, and state and federal aid), not taxes alone, and 2022 is a different vintage than the tax figures elsewhere on this page &mdash; do not add this total to the $72B collections figure above."
correction: "<strong>Accuracy &amp; corrections.</strong> These maps are our best effort to represent Ohio's taxing jurisdictions and tax data accurately from public sources (Ohio Department of Taxation, U.S. Census/TIGER, Ohio ODOT/OGRIP). With thousands of overlapping governments, some inaccuracies are inevitable. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
