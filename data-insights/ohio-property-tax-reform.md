---
layout: data-insight
title: "Ohio's Property Tax Explained"
permalink: /data/insights/ohio-property-tax-reform/
description: "What Ohio's property tax is, what one bill is made of, and where the money goes — the data behind our newsletter series."
eyebrow: "Interactive explainer"
topic: "Taxes"
subtitle: "What the property tax is, what one bill is made of, and where the money goes &mdash; the data behind our newsletter series on the property tax."
updated: "November 11, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Alex Ryan"
stats:
  - value: "$22.6B"
    label: "Real property tax charged in tax year 2025, more than all income taxes in Ohio combined (state, city and school district; $18.0B, latest year available for each)"
  - value: "61%"
    label: "Share that goes to school districts (63% with career-technical districts)"
  - value: "~60%"
    label: "Share of township revenue that comes from the property tax"
  - value: "Local"
    label: "Property taxes are local taxes. The State of Ohio levies none; every dollar goes to local governments and schools."
stats_note: "First two tiles: real property tax charged, tax year 2025, net of HB 920 reduction factors and before state credits; source Ohio Department of Taxation Tax Data Series (PD-23; Property Tax Rates by Levy). Third tile: property tax as a share of total revenue, U.S. Census Bureau Government Finance Database, 2022. Shares are rounded."
intro:
  - "Ohio's real property tax is the largest single tax in the state, and it is the one a proposed constitutional amendment would end. This page collects the tools and numbers behind our newsletter series on it. We take no position on the amendment; everything here is built from public Ohio Department of Taxation data, and we will add to the page over the coming months."
  - "Start with the estimator: click anywhere in Ohio to see which governments tax that spot and roughly what a home there pays."
blocks:
  - type: heading
    id: "what-it-is"
    text: "1 &middot; What the property tax is"
  - type: para
    text: "Ohio taxes 35% of a property's appraised value (farmland is valued under CAUV, a formula based on what the land earns from farming). Rates are quoted in <strong>mills</strong>, dollars of tax per $1,000 of that taxable value, and a bill is the sum of every levy charged by each overlapping government: county, city or township, school district, career-technical district, library, parks and more. Up to 10 mills are levied without a vote (inside millage) and the rest were approved by voters. A 1976 law (HB 920) keeps most voted levies from collecting more from existing property when values rise, so the rate you pay is often well below the rate voters approved. <strong><a href=\"https://gelade1.substack.com/p/whats-at-stake-if-ohio-votes-to-abolish\">Read the full piece: Ohio may vote to abolish the property tax. What's at stake? &rarr;</a></strong>"
  - type: map
    id: "bill-estimator"
    heading: "2 &middot; Your property tax bill, estimated"
    desc: "Click anywhere in Ohio. The map finds that spot's taxing district, lists every government on the bill, each with its 2025 residential rate, and estimates the annual tax on a home value you enter. It is an estimate: for about 97% of spots the rates are that taxing district's own 2025 effective residential rates, and for the rest, flagged approximate, it uses each government's typical (median) rate because the spot could not be matched to one district. The state's credits are applied as a flat share rather than levy by levy. A levy-by-levy version is in the works."
    file: "property_tax_bill.html"
    embed: "/assets/data-insights/ohio-property-tax-reform/property_tax_bill.html"
    title: "Map that estimates the property tax on a home anywhere in Ohio"
  - type: para
    text: "One real bill, worked levy by levy: a Hilliard home valued at $494,400 paid $11,558 for tax year 2025 (the net bill, after state credits) across 49 levies from seven governments. About 61 cents of each dollar went to schools, 16 cents to the township fire district that serves this part of Hilliard, about 12.5 cents to four county social-service boards, and 2 cents to the city, with the rest going to the county, the library and the career center."
  - type: heading
    id: "where-it-goes"
    text: "3 &middot; Where the money goes"
  - type: para
    text: "Of every dollar of real property tax charged statewide, about <strong>61 cents</strong> goes to school districts and about <strong>3 cents</strong> to career-technical districts (63 cents together, after rounding), <strong>17 cents</strong> to counties, <strong>7 cents</strong> each to townships and to cities and villages, and <strong>6 cents</strong> to special districts such as libraries and parks. Townships draw about 60% of their revenue from it, school districts about 42%, cities about 7%, because cities can levy an income tax. Shares are on a net real-property basis (tax year 2025), rounded, and may not sum to 100; the revenue shares for townships, school districts and cities are from the U.S. Census Bureau Government Finance Database (2022). See the <a href=\"/swank-program/data/insights/ohio-tax-explainer/#the-money\">Ohio Tax Explainer</a> for every tax."
  - type: heading
    id: "coming"
    text: "4 &middot; Coming to this page"
  - type: labelledBullets
    items:
      - label: "Levy by levy:"
        text: "every levy on your parcel, what it is for, and the state credits applied line by line."
      - label: "Reappraisal:"
        text: "how a reappraisal can raise a bill without a new levy, and why it can rise faster in school districts at the 20-mill floor."
      - label: "The 2025 law changes:"
        text: "what HB 96, HB 186 and HB 129 change on the bill in your mailbox."
      - label: "Farmland:"
        text: "a county map of what farmland pays per acre under CAUV."
      - label: "Who pays:"
        text: "the tax by income, by owner and renter, and the three views of who ultimately bears it."
      - label: "The Ohio Tax Model (early 2027):"
        text: "change one tax, choose how to pay for it, see who pays."
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, local officials, journalists, and researchers who want to see what governments share a property tax bill and roughly what a home pays."
    - label: "Bill estimator (map 2):"
      text: "Click a spot (tap on a phone), enter a home value, and tick the homestead-credit box for an owner-occupied home. On wider screens, the &#187; button tucks the panel away for a wider map. Keyboard: Tab to the map, pan with the arrow keys, and press Enter to estimate at the crosshair."
citation: "Lade, Gabriel E., and Alex Ryan. \"Ohio's Property Tax Explained.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
related:
  heading: "Read more"
  items:
    - label: "\"Ohio May Vote to Abolish the Property Tax. What's at Stake?\" (Substack)"
      url: "https://gelade1.substack.com/p/whats-at-stake-if-ohio-votes-to-abolish"
    - label: "Ohio Tax Explainer"
      url: "/swank-program/data/insights/ohio-tax-explainer/"
sources:
  - "Rates and taxing districts: Ohio Department of Taxation Tax Data Series, Property Tax Rates by Levy (tax year 2025) and PD-23 (real property tax charged, Class I + Class II, net of HB 920 reduction factors). Taxing-district boundaries: Ohio Department of Taxation and ODOT/OGRIP, with U.S. Census TIGER for counties and school districts."
  - "Estimator method: each spot is matched to its Ohio Department of Taxation taxing district (4,479 districts; about 96&ndash;97% of a random grid of points matches). For a matched spot the rates are that district's own tax year 2025 effective Class I (residential) rates after HB 920, which sum to the department's district rate. The other roughly 3% of spots are flagged approximate and fall back to each government's typical (median) rate across the districts it spans. The estimate applies a flat 10% for the state's credits; on one real Hilliard bill, the resulting estimate came within about 0.8% of the actual bill."
  - "Credits: unticked, the estimate is the bill before any state credit. In 2025 rental homes still received the 10% credit, which phases out from 2026; owner-occupied homes received that credit plus an additional 2.5%."
  - "Revenue shares by government (townships about 60%, school districts about 42%, cities about 7%): U.S. Census Bureau Government Finance Database, 2022, property tax as a share of total revenue. The $18.0B income-tax comparison sums state, city and school-district income taxes, latest year available for each."
  - "Real property only; the roughly $2.6B tax on public-utility tangible personal property is not included."
correction: "<strong>Accuracy &amp; corrections.</strong> These tools are our best effort to represent Ohio's taxing jurisdictions and tax data accurately from public sources (Ohio Department of Taxation, U.S. Census/TIGER, Ohio ODOT/OGRIP). With thousands of overlapping governments, some inaccuracies are inevitable. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
