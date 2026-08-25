---
layout: data-insight
title: "Ohio Tax Explainer"
permalink: /data/insights/ohio-tax-explainer/
description: "An interactive guide to the state and local taxes Ohioans pay — and who actually collects them."
eyebrow: "Interactive map"
topic: "Taxes"
subtitle: "An interactive guide to the state and local taxes Ohioans pay &mdash; and who actually collects them."
updated: "August 25, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Alex Ryan"
stats:
  - value: "$72B"
    label: "Annual state &amp; local tax collections ($33B state, $39B local)"
  - value: "$22.6B"
    label: "Annual real property tax &mdash; the single largest tax (~$1,915/resident)"
  - value: "~67%"
    label: "Share of the property tax that goes to school districts"
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
    text: "Those governments choose from a short menu. The state leans on a <strong>5.75% sales tax</strong> (with local add-ons on top) and a nearly flat <strong>2.75% income tax</strong> on income above ~$26,000, plus a small <strong>0.26% commercial-activity tax</strong> on business receipts. Local governments lean on the <strong>real property tax</strong> &mdash; at $22.6B a year, the single largest tax Ohioans pay (the stat band above carries the headline numbers). <a href=\"https://gelade1.substack.com/p/what-kinds-of-taxes-do-we-pay-in\">Read piece 2 &rarr;</a>"
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
  - type: para
    text: "One term to have before you hover the map below: property-tax rates come as <strong>millage</strong> &mdash; mills per dollar of <strong>assessed value</strong>, which in Ohio is 35% of a property's market value. One mill is $1 per $1,000 assessed, or roughly $35 a year per $100,000 of home value. The <strong>effective</strong> rate is what a homeowner actually pays after Ohio's HB 920 reduction factors trim the voted (gross) rate &mdash; that's the number below, and the one worth comparing across places."
  - type: map
    id: "authority-map"
    heading: "Where those choices land"
    desc: "Four switchable layers &mdash; counties, municipalities, school districts, townships &mdash; each shaded by its headline tax rate. Hover (or tap) any unit for its name and the rates it charges."
    file: "authority_tax_maps.html"
    embed: "/assets/data-insights/ohio-tax-explainer/authority_tax_maps.html"
    frame_id: "authority-frame"
    title: "Interactive map of which taxes each Ohio local government levies"
  - type: para
    text: "Two asymmetries do most of the work here. Most local governments can levy <em>only</em> the property tax &mdash; the income and sales taxes belong to a select few. And rates are local decisions that vary enormously: on the school-district layer, 366 of the 606 districts we can match sit at the state's 20-mill floor for residential property (the red outlines). <a href=\"https://gelade1.substack.com/p/what-can-each-ohio-government-actually\">Read piece 3 &rarr;</a>"
  - type: heading
    id: "the-money"
    text: "4 &middot; The money &mdash; how much, and who gets it?"
  - type: para
    text: "Ohio's state and local governments collect about <strong>$72 billion</strong> a year in taxes &mdash; roughly <strong>$33 billion</strong> at the state level and <strong>$39 billion</strong> locally, or about $6,100 per resident. Local government raises more than the state does. The two halves are built differently: the state's total is three-quarters sales and income tax, while <strong>58% of all local tax revenue is the property tax</strong>. Follow that property-tax dollar to the government that receives it and the split is lopsided &mdash; about <strong>67 cents goes to a school district</strong>, another 2 to a joint vocational district, 15 to the county, 7 to a township, 5 to special districts like libraries and parks, and 4 to a municipality. <a href=\"https://gelade1.substack.com/p/who-collects-ohios-72-billion-in\">Read piece 4 &rarr;</a>"
  - type: map
    id: "county-collections"
    heading: "Where each tax is collected"
    desc: "County totals for the three biggest local taxes, with a per-resident toggle. Switch layers and the hot spots move: retail hubs light up for sales tax, job centers for municipal income tax, and property tax draws a third map again. Remember that where a tax is <em>collected</em> is not where its burden falls &mdash; sales tax is collected where you shop and municipal income tax where you work, not where you live."
    file: "ohio_tax_collections.html"
    embed: "/assets/data-insights/ohio-tax-explainer/ohio_tax_collections.html"
    frame_id: "collections-frame"
    title: "Map of Ohio local tax collections by county"
  - type: para
    text: "Two scope notes for anyone adding up the counties. The property layer is <strong>real</strong> property only &mdash; the $22.6B the November amendment would target &mdash; so it leaves out the separate $2.6B tax on public-utility equipment. And the sales layer is the <strong>county</strong> permissive piece alone, $3.0B; Ohio's eleven regional transit authorities levy roughly $1.0B more, and because their districts cross county lines there is no honest way to draw them on a county map. The map states both on screen."
  - type: heading
    id: "what-it-buys"
    text: "5 &middot; What it buys &mdash; where the money goes"
  - type: para
    text: "Ohio's local governments spent about <strong>$68.6 billion</strong> in 2022 &mdash; a different total than the $39B in local taxes above, because spending also runs on state and federal aid, fees, and charges, not taxes alone. <strong>Education is 43% of it</strong>, $29.6 billion, almost all of that inside school districts. Government administration is next at 12%, then police at 6%. Broken out by government instead of by service, school districts alone account for 42% of all local spending &mdash; more than counties, municipalities, townships, and special districts combined spend on everything they do."
  - type: map
    id: "spending-chart"
    heading: "Where each dollar goes"
    desc: "Toggle between spending by government (see how completely education dominates the school-district bar) and spending by service (see which government does each job). Hover any segment for the dollar amount and its share."
    file: "ohio_tax_spending.html"
    embed: "/assets/data-insights/ohio-tax-explainer/ohio_tax_spending.html"
    frame_id: "spending-frame"
    title: "Chart of Ohio local government spending by government type and service category"
  - type: para
    text: "This is spending, not the tax collections shown above &mdash; a different Census survey, a different year (2022), and a wider funding base than taxes alone, so don't add this total to the $72B figure higher on this page. <a href=\"https://gelade1.substack.com/p/what-do-ohio-taxes-buy\">Read piece 5 &rarr;</a>"
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, local officials, journalists, and researchers who want to see who taxes a given place and how a tax bill is split."
    - label: "How to use:"
      text: "Hover (or tap on mobile) anywhere in Ohio to see every general-purpose government that taxes that spot &mdash; your county, your city or township, and your school district, with the state above them all. Read it as \"which governments tax here,\" not as an exact dollar bill."
    - label: "Authority map:"
      text: "Use the buttons to switch layers (counties, municipalities, school districts, townships) and hover any unit for the tax rates it charges. The &#187; button tucks the panel away for a full-width map."
    - label: "Spending chart:"
      text: "Toggle between spending by government and spending by service, and hover any bar segment for the dollar amount and its share. This is 2022 spending from all revenue sources, not tax collections &mdash; a different total than the tax figures elsewhere on this page."
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
  - "Authority-map vintages: property rates TY2025 (incl. the Class I 20-mill Floor Rate column); school-district income-tax rate FY2026 (SD-2, Q4); municipal income-tax rate CY2024 (LG-11). The map shows rates only, not collections; ODT does not publish a per-county permissive sales-tax rate table (Table S-1 reports dollars collected, not the rate), so the county layer is shaded by county property millage instead and the sales-tax row is labeled accordingly."
  - "County-collections map vintages: real property taxes charged TY2025 (PD-23, Class I + Class II, net of HB 920 reduction factors); county permissive sales/use CY2025 (S-1); municipal income CY2024 (LG-11); population ACS 2020&ndash;24. The property layer excludes the public-utility tangible personal property tax ($2.6B), and the sales layer excludes the regional transit authorities ($1.0B), which levy across county lines."
  - "Collections totals are statewide sums across all local governments in a county, not any one government's take, and the three taxes have different bases &mdash; do not compare the layers directly."
  - "Spending chart: U.S. Census Bureau Survey of State &amp; Local Government Finances, 2022 (Government Finance Database). Covers Ohio's local governments (counties, municipalities, townships, school districts, special districts) only &mdash; state direct spending is excluded. Spending is funded from all revenue sources (taxes, fees, and state and federal aid), not taxes alone, and 2022 is a different vintage than the tax figures elsewhere on this page &mdash; do not add this total to the $72B collections figure above."
correction: "<strong>Accuracy &amp; corrections.</strong> These maps are our best effort to represent Ohio's taxing jurisdictions and tax data accurately from public sources (Ohio Department of Taxation, U.S. Census/TIGER, Ohio ODOT/OGRIP). With thousands of overlapping governments, some inaccuracies are inevitable. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
