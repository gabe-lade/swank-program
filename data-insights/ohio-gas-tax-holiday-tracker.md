---
layout: data-insight
title: "Ohio Gas Tax Holiday Tracker"
permalink: /data/insights/ohio-gas-tax-holiday-tracker/
description: "How much of Ohio's gas tax holiday is reaching the pump, and what it has meant for Ohio households. Updated weekly."
eyebrow: "Interactive chart"
topic: "Taxes"
subtitle: "How much of Ohio's 90-day gas tax holiday is reaching the pump, and what it has meant for Ohio households &mdash; updated weekly."
updated: "November 18, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
# >>> auto-stats (written by write_page_stats.py from tracker.js; do not hand-edit)
stats:
  - value: "$21"
    label: "Average savings per Ohio household so far (Oct. 4 to Nov. 17, 45 of 90 days)"
  - value: "$41"
    label: "Projected savings per household over all 90 days if the holiday-to-date share holds (our September forecast: $51)"
  - value: "59%"
    label: "Share of the 38.5&cent; gasoline tax cut showing up at the pump (diesel: 54% of the 47&cent; tax)"
  - value: "32&cent;"
    label: "Of each dollar of forgone fuel tax, the amount reaching Ohio households (other buyers get about 25&cent;; about 43&cent; isn't showing up in prices; our forecast was 39&cent;)"
stats_note: "Holiday to date, through November 17, 2026. Savings are averages over all 4.9 million Ohio households, including those without a car. Pump-price share: Ohio compared with Indiana, Michigan, Pennsylvania, Kentucky, and West Virginia, AAA daily prices. Household fuel use: Consumer Expenditure Survey and American Community Survey. Updated weekly."
# <<< auto-stats
intro:
  - "From October 4, 2026, through January 2, 2027, Ohio has suspended its 38.5-cent gasoline tax and 47-cent diesel tax, at a cost to the state of up to $725 million. The goal is lower prices at the pump. But a tax cut doesn't automatically reach drivers. Refiners, wholesalers, and gas stations can keep part of it. And of the part that does reach the pump, much goes to businesses, trucking companies, and out-of-state drivers rather than Ohio households."
  - "This tracker checks how much of the tax cut is showing up in prices, and what that means for Ohio households. Pump prices move for many reasons, like oil prices and refinery outages, so a falling Ohio price alone doesn't tell us much. Instead, we compare Ohio with its neighbors (Indiana, Michigan, Pennsylvania, Kentucky, and West Virginia), which face the same oil prices and supply but didn't change their gas taxes when Ohio's holiday began. If the holiday reached drivers, Ohio prices should fall relative to its neighbors by about the size of the tax."
  - "Prices are <a href=\"https://gasprices.aaa.com/?state=OH\">AAA's daily state averages</a>. We update the tracker every week. It goes with our newsletter series on the holiday, which explains the methods and what the numbers mean."
blocks:
  - type: map
    id: "weekly-prices"
    heading: "1 &middot; Prices in Ohio and its neighbors, week by week"
    desc: "The top panel shows average weekly prices in Ohio and the average of its five neighbors. The bottom panel shows how much cheaper Ohio was than usual: Ohio's price minus the neighbor average, compared with the month before the holiday. If the whole tax cut reached the pump, the red bars would reach the dashed line. Switch between gasoline and diesel, and hover or tap any week for details. A lighter bar is the current week, still in progress. The <em>Compare Ohio with</em> menu swaps the five-state average for all neighbors but Indiana or for any one neighbor, and the strip above the charts shows how much the answer depends on that choice."
    file: "Weekly prices: Ohio vs. neighboring states"
    embed: "/assets/data-insights/ohio-gas-tax-holiday-tracker/weekly_prices.html"
    frame_id: "gth-frame"
    autoresize: true
    title: "Weekly gasoline and diesel prices in Ohio and neighboring states, and Ohio's price gap relative to before the gas tax holiday"
  - type: para
    text: "Ohio gas prices rise and fall in regular cycles, so a single week can be misleading. The boxes at the top of the page average over every day of the holiday so far, and that running average is the number to watch. <strong><a href=\"https://gelade1.substack.com/p/who-would-benefit-from-a-gas-tax\">Read the full piece: Who would benefit from a gas tax holiday? &rarr;</a></strong>"
  - type: heading
    id: "who-benefits"
    text: "2 &middot; Who gets the money"
  - type: para
    text: "Every dollar the state gives up goes to one of three groups. Ohio households get the part of the price cut on the fuel they buy. Other buyers (businesses, farms, trucking companies, and out-of-state drivers) get the part of the price cut on their fuel. Refiners, wholesalers, and gas stations keep whatever doesn't show up in prices. The fourth box at the top of the page applies the share reaching the pump to household fuel use from the Consumer Expenditure Survey and the American Community Survey, the same model behind our September forecast. <strong><a href=\"https://gelade1.substack.com/p/what-would-a-gas-tax-holiday-do-for\">Read the full piece: What would a gas tax holiday do for Ohio farmers? &rarr;</a></strong>"
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio residents, lawmakers, journalists, and researchers following whether the gas tax holiday is lowering prices, and for whom."
    - label: "Weekly prices (chart 1):"
      text: "Switch fuels, then hover or tap a week. The red bars show how much lower Ohio's price was than usual, relative to its neighbors; the dashed line is the full tax cut. A lighter bar is a week still in progress. \"Show as a table\" lists every number."
    - label: "Comparison menu:"
      text: "The boxes at the top of the page always use the five-neighbor average. The menu inside the chart recomputes the share at the pump and household savings against other comparisons. Single states are usually noisier, and some had tax changes of their own; the chart notes these."
    - label: "The boxes:"
      text: "Holiday-to-date averages, recomputed each week. Single weeks swing a lot; the running averages move less, and less each week."
citation: "Lade, Gabriel E. \"Ohio Gas Tax Holiday Tracker.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
download:
  label: "holiday-to-date pass-through and household savings by week (CSV)"
  url: "/assets/data-insights/ohio-gas-tax-holiday-tracker/data/gas-tax-holiday-tracker.csv"
related:
  heading: "Read more"
  items:
    - label: "\"How a Diesel Tax Holiday Could Cost Farmers\" (Substack)"
      url: "https://gelade1.substack.com/p/how-a-diesel-tax-holiday-could-cost"
    - label: "\"What Would a Gas Tax Holiday Do for Ohio Farmers?\" (Substack)"
      url: "https://gelade1.substack.com/p/what-would-a-gas-tax-holiday-do-for"
    - label: "\"Who Would Benefit from a Gas Tax Holiday?\" (Substack)"
      url: "https://gelade1.substack.com/p/who-would-benefit-from-a-gas-tax"
sources:
  - "Pump prices: AAA daily state average prices for regular gasoline and diesel in Ohio, Indiana, Michigan, Pennsylvania, Kentucky, and West Virginia, collected from AAA's state pages and archived copies on the Internet Archive. Gaps of four days or fewer are filled by linear interpolation. Weeks run Sunday to Saturday; the chart shows weeks with at least three days of data."
  - "Share of the tax reaching the pump: the average change in Ohio's price minus the neighbor average from October 4 to the latest date, relative to its September 4&ndash;October 3 average, divided by the tax (38.5&cent; gasoline, 47&cent; diesel). Indiana has suspended its own gasoline tax since spring; because that suspension was in place both before and after October 4, it doesn't affect the comparison (we will drop Indiana from the comparison if its suspension ends during Ohio's holiday). The comparison menu in the chart shows how the estimate changes without Indiana or against one neighbor at a time. Kentucky cut its gas tax by 10 cents in May, also before the holiday. As of mid-November, using a longer pre-holiday baseline (from August 1) raises the gasoline estimate to about 69%; the diesel estimate changes little."
  - "Who benefits: household fuel use from the Consumer Expenditure Survey and the American Community Survey; taxed gallons from the Ohio Department of Taxation and FHWA. Each dollar is split using a 90-day cost of about $640 million. The state appropriated up to $725 million. Household savings so far are the 90-day projection scaled by the days elapsed."
  - "Weekly estimates are noisy. Ohio gasoline prices move in regular cycles (Edgeworth cycles), and before the holiday Ohio's gap with its neighbors moved by 30 cents or more within a few weeks."
correction: "<strong>Accuracy &amp; corrections.</strong> These estimates come from public price data and a simple comparison with neighboring states. They will change as new data arrive. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
