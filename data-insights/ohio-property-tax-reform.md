---
layout: data-insight
title: "Ohio's Property Tax Explained"
permalink: /data/insights/ohio-property-tax-reform/
description: "What Ohio's property tax is, what one bill is made of, and where the money goes — the tools and data behind it."
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
stats_note: "First two tiles: real property tax charged on homes, farms and businesses in tax year 2025, after the state's reductions that offset rising values (HB 920) and before the state's credits; source: Ohio Department of Taxation Tax Data Series. Third tile: property tax as a share of each type of government's total revenue, U.S. Census Bureau Government Finance Database, 2022. Shares are rounded."
intro:
  - "Ohio's real property tax is the largest single tax in the state, and it is the one a proposed constitutional amendment would end. This page collects the tools and numbers on it. We take no position on the amendment; everything here is built from public Ohio Department of Taxation data, and we will add to the page over the coming months."
  - "Start with the estimator: click anywhere in Ohio to see which governments tax that spot and roughly what a home there pays."
blocks:
  - type: heading
    id: "what-it-is"
    text: "1 &middot; What the property tax is"
  - type: para
    text: "Ohio taxes property on 35% of its appraised value (farmland is valued under CAUV, a formula based on what the land earns from farming). Rates are quoted in <strong>mills</strong>, dollars of tax per $1,000 of that taxable value, and a bill is the sum of every levy charged by each overlapping government: county, city or township, school district, career-technical district, library, parks and more. Up to 10 mills are levied without a vote (inside millage) and the rest were approved by voters. A 1976 law (HB 920) keeps most voted levies from collecting more from existing property when values rise, so the rate you pay is often well below the rate voters approved. <strong><a href=\"https://gelade1.substack.com/p/whats-at-stake-if-ohio-votes-to-abolish\">Read the full piece: Ohio may vote to abolish the property tax. What's at stake? &rarr;</a></strong>"
  - type: map
    id: "bill-estimator"
    heading: "2 &middot; Your property tax bill, estimated"
    desc: "The estimator finds a spot's taxing district, lists every government on the bill with its 2025 residential rate, and estimates the annual tax on a home value you enter. This is an estimate. For most spots (about 97%), we use that district's own 2025 rates. For the rest, we can't match one district, so we use each government's typical rate and flag the result as approximate."
    file: "Property tax bill estimator"
    embed: "/assets/data-insights/ohio-property-tax-reform/property_tax_bill.html"
    frame_id: "bill-frame"
    title: "Map that estimates the property tax on a home anywhere in Ohio"
  - type: para
    text: "Here is one real bill. A Hilliard home valued at $494,400 paid $11,558 for tax year 2025 (the net bill, after state credits) across 49 levies from seven governments. About 61 cents of each dollar went to schools, 16 cents to the township fire district that serves this part of Hilliard, about 12.5 cents to four county social-service boards, and 2 cents to the city, with the rest going to the county, the library and the career center."
  - type: heading
    id: "where-it-goes"
    text: "3 &middot; Where the money goes"
  - type: para
    text: "Of every dollar of real property tax charged statewide in tax year 2025, about <strong>60.8 cents</strong> goes to school districts, <strong>2.6 cents</strong> to career-technical districts (<strong>63.4 cents</strong> together), <strong>16.5 cents</strong> to counties, <strong>7.4 cents</strong> to townships, <strong>6.5 cents</strong> to cities and villages, and <strong>6.1 cents</strong> to special districts such as libraries and parks. These are rounded to a tenth of a cent, so they add to 99.9 rather than 100. Townships draw about 60% of their revenue from the property tax, school districts about 42%, and cities about 7%, because cities can levy an income tax (U.S. Census Bureau Government Finance Database, 2022). The shares are after the state's rate reductions and before its credits. See the <a href=\"/swank-program/data/insights/ohio-tax-explainer/#the-money\">Ohio Tax Explainer</a> for every tax."
  - type: heading
    id: "coming"
    text: "4 &middot; Coming to this page"
  - type: labelledBullets
    items:
      - label: "Levy by levy:"
        text: "every levy on your parcel, what it is for, and the state credits applied line by line."
      - label: "Reappraisal:"
        text: "how a reappraisal can raise a bill without a new levy, and why it can rise faster in school districts whose rate is held at a 20-mill minimum."
      - label: "The 2025 law changes:"
        text: "what HB 96, HB 186 and HB 129 change on the bill in your mailbox."
      - label: "Farmland:"
        text: "a county map of what farmland pays per acre under CAUV."
      - label: "Who pays:"
        text: "the tax by income, by owner and renter, and who ultimately pays it."
      - label: "The Ohio Tax Model (early 2027):"
        text: "change one tax, choose how to pay for it, see who pays."
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, local officials, journalists, and researchers who want to see what governments share a property tax bill and roughly what a home pays."
    - label: "Bill estimator:"
      text: "Enter a home value and tick the owner-occupancy box if the home is owner-occupied. On wider screens, the &#187; button tucks the panel away for a wider map."
citation: "Lade, Gabriel E., and Alex Ryan. \"Ohio's Property Tax Explained.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
related:
  heading: "Read more"
  items:
    - label: "\"Ohio May Vote to Abolish the Property Tax. What's at Stake?\" (Substack)"
      url: "https://gelade1.substack.com/p/whats-at-stake-if-ohio-votes-to-abolish"
    - label: "Ohio Tax Explainer"
      url: "/swank-program/data/insights/ohio-tax-explainer/"
sources:
  - "Rates and taxing districts: Ohio Department of Taxation Tax Data Series, Property Tax Rates by Levy (tax year 2025), and PD-23 (the department's table of real property tax charged by county, Class I residential/agricultural plus Class II commercial/industrial, net of HB 920 reduction factors). Taxing-district boundaries: Ohio Department of Taxation and the Ohio Geographically Referenced Information Program (OGRIP) at ODOT, with U.S. Census TIGER for counties and school districts."
  - "Estimator method: each spot is matched to its Ohio Department of Taxation taxing district (4,479 districts). About 97% of the state's area matches (96.7% on a grid we checked); for those spots the rates are that district's own tax year 2025 effective Class I (residential) rates after HB 920, which sum to the department's district rate. The other 3% are flagged approximate and use each government's typical (median) rate across the districts it spans. The estimate applies a flat 10% for the state's credits; on one real Hilliard bill, the resulting estimate came within about 0.8% of the actual bill."
  - "Credits: the state's 10% and 2.5% (owner-occupancy) credits apply only to levies approved before late 2013, so on a whole owner-occupied bill they come to roughly 10% (the Hilliard bill nets about 9%). Unticked, the estimate is the bill before any state credit. In 2025 rental homes still received the 10% credit, which phases out from 2026."
  - "Revenue shares by government (townships about 60%, school districts about 42%, cities about 7%): U.S. Census Bureau Government Finance Database, 2022, property tax as a share of total revenue. The $18.0B income-tax comparison sums state, city and school-district income taxes, latest year available for each."
  - "Statewide shares of the tax by type of government (60.8% school districts, 2.6% career-technical, 16.5% counties, 7.4% townships, 6.5% cities and villages, 6.1% special districts): Ohio Department of Taxation PD-23 real property tax charged by type of government, tax year 2025."
  - "Real property only; the roughly $2.6B tax on public-utility tangible personal property is not included."
correction: "<strong>Accuracy &amp; corrections.</strong> We built this from public data. With thousands of overlapping governments, some errors are likely. If you spot one, email <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a>."
---
