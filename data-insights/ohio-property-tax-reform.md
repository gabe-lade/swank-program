---
layout: data-insight
title: "Ohio's Property Tax Explained"
permalink: /data/insights/ohio-property-tax-reform/
description: "What Ohio's property tax is, what one bill is made of, and where the money goes — the data behind our newsletter series."
eyebrow: "Interactive explainer"
topic: "Taxes"
subtitle: "What the property tax is, what one bill is made of, and where the money goes &mdash; the data behind our newsletter series, <em>Ohio's Property Tax, Explained</em>."
updated: "November 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Alex Ryan"
stats:
  - value: "$22.6B"
    label: "Real property tax charged in tax year 2025, more than all of Ohio's income taxes combined ($18.0B)"
  - value: "61%"
    label: "Share that goes to school districts (63% with career-technical districts)"
  - value: "~60%"
    label: "Share of township revenue that comes from the property tax"
  - value: "Local"
    label: "Property taxes are local taxes. The State of Ohio levies none; every dollar goes to local governments and schools."
stats_note: "Real property tax charged, tax year 2025, net of HB 920 reduction factors and before state credits. Source: Ohio Department of Taxation Tax Data Series (PD-23; Property Tax Rates by Levy)."
intro:
  - "Ohio's real property tax is the largest single tax in the state, and it is the one a proposed constitutional amendment would end. This page collects the tools and numbers behind our newsletter series on it. We take no position on the amendment; everything here is built from public Ohio Department of Taxation data, and we will add to the page as the series runs."
  - "Start with the estimator: click anywhere in Ohio to see which governments tax that spot and roughly what a home there pays."
blocks:
  - type: heading
    id: "what-it-is"
    text: "1 &middot; What the property tax is"
  - type: para
    text: "Ohio taxes 35% of a property's appraised value. Rates are quoted in <strong>mills</strong>, dollars of tax per $1,000 of that taxable value, and a bill is the sum of every levy the voters of each overlapping government have approved: county, city or township, school district, career-technical district, library, parks and more. A 1976 law (HB 920) holds most voted levies to the dollars they first raised, so the rate you pay is usually far below the rate on the ballot. <strong><a href=\"https://gelade1.substack.com/p/whats-at-stake-if-ohio-votes-to-abolish\">Read: Ohio may vote to abolish the property tax. What's at stake?</a></strong>"
  - type: map
    id: "bill-estimator"
    heading: "2 &middot; Your property tax bill, estimated"
    desc: "Click anywhere in Ohio. The map finds that spot's taxing district, lists every government that shares the bill with its 2025 residential rate, and estimates the annual tax on a home value you enter. It is an estimate: it uses each government's typical rate rather than the exact levies on a parcel, applies the state's credits as a flat share, and flags the roughly 3% of spots it cannot match to a taxing district as approximate. A levy-by-levy version is in the works."
    file: "property_tax_bill.html"
    embed: "/assets/data-insights/ohio-property-tax-reform/property_tax_bill.html"
    frame_id: "bill-frame"
    title: "Map that estimates the property tax on a home anywhere in Ohio"
  - type: para
    text: "One real bill, worked levy by levy: a Hilliard home valued at $494,400 paid $11,558 for tax year 2025 across 49 levies from seven governments. About 61 cents of each dollar went to schools, 16 cents to the township's fire and EMS levies, 12 cents to four county social-service boards, and 2 cents to the city."
  - type: heading
    id: "where-it-goes"
    text: "3 &middot; Where the money goes"
  - type: para
    text: "Of every dollar of real property tax charged statewide, about <strong>61 cents</strong> goes to school districts and <strong>3 cents</strong> to career-technical districts, <strong>17 cents</strong> to counties, <strong>7 cents</strong> each to townships and to cities and villages, and <strong>6 cents</strong> to special districts such as libraries and parks. Townships draw about 60% of their revenue from it, school districts about 42%, cities about 7%, because cities can levy an income tax. Shares are on a net real-property basis (tax year 2025); see the <a href=\"/swank-program/data/insights/ohio-tax-explainer/#the-money\">Ohio Tax Explainer</a> for every tax."
  - type: heading
    id: "coming"
    text: "4 &middot; Coming to this page"
  - type: labelledBullets
    items:
      - label: "Levy by levy:"
        text: "every levy on your parcel, what it is for, and the state credits applied line by line."
      - label: "Reappraisal:"
        text: "why a bill rises when nobody voted, and why in 20-mill-floor districts it rises more."
      - label: "The 2025 law changes:"
        text: "what HB 96, HB 186 and HB 129 change on the bill in your mailbox."
      - label: "Farmland:"
        text: "a county map of what farmland pays per acre under CAUV."
      - label: "Who pays:"
        text: "the tax by income, by owner and renter, and the three views of who really bears it."
      - label: "The Ohio Tax Model (January 2027):"
        text: "change one tax, choose how to pay for it, see who pays."
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, local officials, journalists, and researchers who want to see what governments share a property tax bill and roughly what a home pays."
    - label: "Bill estimator (map 2):"
      text: "Click a spot (tap on a phone), enter a home value, and tick owner-occupied if it applies. The &#187; button tucks the panel away for a wider map."
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
  - "Estimator method: each spot is matched to its Ohio Department of Taxation taxing district (4,479 districts; about 96&ndash;97% of a random grid of points matches, and the rest fall back to an overlay of each government's own rate, flagged approximate). Rates are tax year 2025 effective Class I (residential) rates after HB 920. Where a government spans several districts, its rate is the median of its levy across them. The owner-occupied box applies a flat 10% for the state's credits; on a levy-by-levy check of one parcel the flat share differed from the credits computed levy by levy by about 0.8%."
  - "Real property only; the roughly $2.6B tax on public-utility tangible personal property is not included."
correction: "<strong>Accuracy &amp; corrections.</strong> These tools are our best effort to represent Ohio's taxing jurisdictions and tax data accurately from public sources (Ohio Department of Taxation, U.S. Census/TIGER, Ohio ODOT/OGRIP). With thousands of overlapping governments, some inaccuracies are inevitable. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
