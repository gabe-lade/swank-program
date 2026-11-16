---
layout: data-insight
sitemap: false   # unlisted preview: reachable by link only, not in the sitemap, nav or tools.yml
title: "45Z and Ohio Corn"
permalink: /data/insights/45z-ohio-corn/
description: "What low-carbon corn practices are worth to Ohio ethanol plants under the federal 45Z clean fuel credit, county by county."
eyebrow: "Interactive map"
topic: "Agriculture"
subtitle: "What low-carbon corn practices are worth to Ohio ethanol plants under the federal 45Z credit, county by county, and where plants may compete for documented bushels."
updated: "November 16, 2026"
authors:
  - name: "Gabriel E. Lade"
    url: "https://gabe-lade.github.io/"
  - name: "Zoey Zhao"
    url: "https://yuzhao66.github.io"
stats:
  - value: "$0.55&ndash;0.80"
    label: "Credit value to a plant of a documented no-till bushel, for 80% of Ohio's corn (180 lb N per acre). Not a price."
  - value: "$1.09"
    label: "Full 45Z credit per gallon in 2026. Each 5-point step in a plant's carbon score is worth about 11&cent; per gallon."
  - value: "~1 in 2"
    label: "Bushels a plant buys that would have to be documented no-till corn for it to earn one more step (43&ndash;64%, by plant)"
  - value: "$5.5&ndash;17.7M"
    label: "What one step is worth a year to an Ohio plant, smallest to largest: 11&cent; a gallon, or 32&cent; to the plant on every bushel it buys"
stats_note: "Draft, pending Treasury's final 45Z rule. Carbon scores match USDA's Excel calculator in 30 test cases; we estimated each plant's position from public filings; plants don't report it. Sources: USDA FD-CIC v1.2; IRS Notice 2026-41; USDA NASS 2022 Census of Agriculture; EIA."
intro:
  - "For fuel sold through 2029, the federal 45Z credit pays an ethanol plant more when its fuel has a lower carbon score. New USDA rules let a plant count how corn was grown, if the grower keeps the records to prove it. For most of Ohio's corn, a documented no-till bushel (one with the records USDA requires) is worth roughly $0.55 to $0.80 to a plant at today's credit rate, and less in lower-yield counties."
  - "<strong>That is the plant's tax credit, not a price.</strong> What growers are paid will be whatever share plants offer, minus the cost of paperwork. We know of no published offers from Ohio plants yet."
  - "<strong>Start with your own fields.</strong> Ohio Corn &amp; Wheat's free calculator scores a field from its nitrogen, yield, tillage, cover crops, manure, and inhibitor use, and your own numbers matter more than your county's. <strong><a href=\"https://ohiocornandwheat.org/about-us/corn-marketing-program/#45z-calculator\">Open the OCW 45Z calculator &rarr;</a></strong>"
blocks:
  - type: map
    id: "county-map"
    heading: "1 &middot; What it's worth near you"
    desc: "Find your county to see every practice side by side, the plants within 50 miles (50 miles is our assumption, not a USDA rule), and whether they are likely to compete for documented corn. Switch to <em>Will plants compete?</em> to see where plants may pay extra. Change the nitrogen assumption to see how much your own nitrogen use matters."
    file: "County map: what documented corn is worth"
    embed: "/assets/data-insights/45z-ohio-corn/county_values.html"
    frame_id: "zc-frame"
    autoresize: true
    title: "Interactive map of the 45Z credit value of documented low-carbon corn to Ohio ethanol plants, by county"
  - type: heading
    id: "how-to-read"
    text: "2 &middot; How to read these numbers"
  - type: labelledBullets
    items:
      - label: "It's the plant's value, not your price."
        text: "Each figure is the 45Z credit a plant would earn from a bushel's lower carbon score if it passed all of it through. What you're offered depends on the plant, competing buyers, and the cost of paperwork. Expect a fraction."
      - label: "Plants earn in steps."
        text: "A plant's credit only moves when its whole fuel score crosses a 5-point step on the carbon scale. Each step is worth about 11&cent; per gallon of ethanol the plant makes, not per bushel of your corn. A bushel that helps a plant cross a step is worth more to it; one that doesn't may be worth little."
      - label: "Your nitrogen matters most."
        text: "Your carbon score is driven by nitrogen per bushel harvested. At the same practice, each 0.1 lb less N per bushel is worth about 10&cent; more per bushel to a plant."
      - label: "The catch: you need records."
        text: "Practices count only with a nutrient budget (a written plan of the N, P, and K you'll apply against crop need, made before any fertilizer or manure goes on) and records kept five years. No-till requires a commitment of 4 years in 5. The corn has to reach the plant through a documented supply chain. Who checks the records, and who pays for that, depends on the plant."
      - label: "Why this can differ from the OCW calculator."
        text: "OCW shows how much a practice lowers your score compared with conventional farming at your own nitrogen rate. This page compares documented corn with USDA's default score, which a plant must use for corn without records. Both are right; they answer different questions. The gap, often about 10&cent; a bushel, is the value of documenting efficient nitrogen use."
  - type: heading
    id: "ask-your-buyer"
    text: "3 &middot; Ask your buyer"
  - type: para
    text: "Call the grain desk at the plants near you, or your elevator, and ask: <em>\"Are you paying anything extra for 45Z-documented corn? Which practices, what records, and who pays for verification?\"</em> Get any offer in writing before changing practices. For lenders: count it only as contract income once a buyer has offered it in writing, and only through 2029."
  - type: heading
    id: "plants"
    text: "4 &middot; Plant by plant: who earns the credit, and what a step takes"
  - type: para
    text: "Every plant near you is probably already earning some 45Z credit, and every one could earn more with enough documented corn. None says publicly how close it is to its next step, so the only way to learn what, if anything, your corn is worth to a plant is to ask its grain desk (section 3). What follows is what the public record shows about each plant, and how much qualifying corn already grows nearby. Three Indiana plants just across the line (Union City, Portland and Bluffton) are included because a quarter to nearly half of the corn grown within 50 miles of them is Ohio corn."
  - type: map
    id: "plant-positions"
    heading: "4a &middot; Where each plant likely stands"
    desc: "Each bar spans the steps the public evidence allows; a faded end means the plant may be further along than the bar shows. Tap or hover a bar for the evidence, or open the table under the chart. Nobody outside a plant knows its exact score, so confidence is low, at best moderate, everywhere."
    file: "Where each plant likely stands"
    embed: "/assets/data-insights/45z-ohio-corn/plant_positions.html"
    frame_id: "zp-frame"
    autoresize: true
    title: "Chart of where each Ohio ethanol plant, and three nearby Indiana plants, likely stands on the 45Z carbon-score steps, from public evidence"
  - type: labelledBullets
    items:
      - label: "Every step is worth the same."
        text: "About 11&cent; a gallon, or 32&cent; to the plant on every bushel it buys: $5.5 million a year at the smallest Ohio plant and $17.7 million at the largest. So what decides how much a plant wants documented corn is not which step it is on but its distance to the next line."
      - label: "Not yet earning the credit."
        text: "Documented corn earns the plant nothing unless it, together with cheaper changes the plant can make itself, pushes the score under the 47.5 line. A plant close to the line has the strongest reason to shop; one well above it, with no project under way, has little."
      - label: "Already earning one to three steps."
        text: "The plant already banks the credit, and documented corn is about the next step. A plant 1 point from its next step needs about a fifth as much documented corn as a plant 5 points away. Each bushel is worth more to it. But it won't pay more than its cheapest other fix would cost."
      - label: "Across a line, then nothing."
        text: "A plant has reason to buy enough documented corn to finish a step, plus a cushion; bushels beyond that add nothing to its credit until it aims for the next step. That is why the values on this page are averages at the credit rate, not prices: a plant may pay more for the few bushels that finish a short gap and little for bushels that finish no step."
      - label: "Storing CO2."
        text: "A plant that captures and stores its CO2 can claim the 45Q credit or stay in 45Z with a much lower score, not both. Through 2029, 45Z likely pays about three times more per gallon than 45Q. So a plant that stores carbon will probably keep buying documented corn for its next step. It stops only if it switches to 45Q. Marion has announced a storage project and a Leipsic project has been reported; neither is operating. Union City, Indiana, is reported to have a final permit for a storage well, also not yet operating."
  - type: map
    id: "plant-need-supply"
    heading: "4b &middot; How much documented corn a step takes, and how much grows nearby"
    desc: "A full step takes documented no-till corn equal to roughly half of what a plant uses: 43&ndash;49% at the western Ohio and Indiana plants and 64% at Coshocton, where USDA's model gives no-till a smaller carbon cut. It takes less if the plant is already partway to the line, or if the corn has a cover crop as well. Orange is that need. Blue is the no-till and cover-crop corn within 50 miles that no closer plant would claim. Reduced till isn't counted. It assumes every grower keeps records. A no-till bushel with a cover crop counts for about 1.6, and the blue label shows how many steps that corn could cover. Open <em>What if</em> under the chart to see what happens if fewer fields are no-tilled, or if cover crops were added beyond what the Census counts."
    file: "Need vs. supply, by plant"
    embed: "/assets/data-insights/45z-ohio-corn/plant_need_supply.html"
    frame_id: "zs-frame"
    autoresize: true
    title: "Chart comparing the documented no-till corn each ethanol plant would need for one 45Z step with the qualifying corn within 50 miles, with assumption toggles"
  - type: para
    text: "<strong>The limit is not how many farms already no-till; it is how many of them keep the records 45Z requires.</strong> At the no-till rate the county map uses, if every qualifying grower documented, nearby corn would cover a full step at every plant; if half did, only Bloomingburg would clear it and Leipsic would sit right at the line. A cover crop adds supply on any field: it cuts about as much carbon on no-till as on tilled ground. Adding cover crops to a quarter of the no-till corn (about 1.6 times the cover-crop acres the Census counts) would raise supply about a tenth. The 50-mile circles around Leipsic, Fostoria, Lima and Marion overlap, so they draw on the same corn; so do Greenville, Union City and Portland."
  - type: map
    id: "plant-premium-map"
    heading: "4c &middot; Where growers with good records could benefit"
    desc: "Plants are more likely to pay extra where two things are true: the plants near a county would run short of documented corn for a full step if only half of growers kept records, and more than one company buys corn there. Darkest counties have both, and most of western Ohio does. The shading is about the plants near a county, not the county's own corn; it is the same view as <em>Will plants compete?</em> on the section 1 map. This shows where conditions look favorable. It is not a prediction of what any plant will pay."
    file: "Where plants may pay extra"
    embed: "/assets/data-insights/45z-ohio-corn/plant_premium_map.html"
    frame_id: "zm-frame"
    autoresize: true
    title: "Map of Ohio counties shaded by whether nearby ethanol plants may be short of documented corn and whether more than one company buys there"
  - type: heading
    id: "questions"
    text: "5 &middot; Questions growers ask"
  - type: labelledBullets
    items:
      - label: "Is any plant paying a premium yet?"
        text: "We haven't found published offers from Ohio plants as of October 2026. Programs may be offered privately or through elevators, so ask your buyer."
      - label: "Which crop year counts, and how long does this last?"
        text: "The credit applies to fuel sold through December 31, 2029, and the dollar amount is adjusted for inflation each year. Corn harvested this fall mostly becomes fuel sold next year. The nutrient-budget rule is relaxed only for corn in fuel produced in 2025 and 2026; after that, the budget has to be written before you apply any fertilizer or manure, including this fall's P, K, and manure."
      - label: "I sell to an elevator, not a plant. Does my corn count?"
        text: "It can, if your records travel with the grain through the elevator to the plant. Ask your elevator whether it takes part in a plant's low-carbon program."
      - label: "Do all plants want low-carbon corn?"
        text: "Not necessarily. A plant that captures and stores carbon may claim a different federal credit (45Q) instead of 45Z, and then low-carbon corn wouldn't change its credit, though through 2029 staying in 45Z likely pays more. A plant that is far from its next step may also not pay much. See section 4."
      - label: "I use manure or a nitrogen inhibitor. Is that included?"
        text: "Not on this page. Both change your score; the OCW calculator includes them, so use it for your fields."
      - label: "What about soybeans?"
        text: "This page covers corn sold to ethanol plants. Soybean oil used for biodiesel and renewable diesel can also earn 45Z, but that runs through crushers and fuel makers mostly outside Ohio."
      - label: "For lenders: should this go into cash-flow projections?"
        text: "Only as contract income once a buyer has offered it in writing, and only through 2029. The values here are what a plant could earn, not what a grower will receive."
use_cite:
  heading: "Use &amp; cite this tool"
  rows:
    - label: "Best for:"
      text: "Ohio corn growers, Extension educators, ag lenders, and reporters asking what documented low-carbon practices are worth to nearby ethanol plants."
    - label: "How to use it:"
      text: "Find your county on the map, pick a practice and your nitrogen rate, and read every figure as the plant's credit, not a price. Hover a plant's bar for the evidence behind it. We estimated each plant's position from public filings; plants don't report it."
    - label: "Share:"
      text: "The page address updates as you choose a county and view, so you can copy it to share that view."
citation: "Lade, Gabriel E., and Zoey Zhao. \"45Z and Ohio Corn.\" C. William Swank Program in Rural-Urban Policy, The Ohio State University, 2026."
related:
  heading: "Read more"
  items:
    - label: "Ohio Corn &amp; Wheat 45Z calculator"
      url: "https://ohiocornandwheat.org/about-us/corn-marketing-program/#45z-calculator"
      note: "(score your own fields)"
    - label: "\"45Z: Carbon pricing comes to corn\" (Matt Gammans, Substack)"
      url: "https://mattgammans.substack.com/p/45z-carbon-pricing-comes-to-corn"
    - label: "\"45Z: Meditations on mass balance accounting\" (Matt Gammans, Substack)"
      url: "https://mattgammans.substack.com/p/45z-meditations-on-mass-balance-accounting"
    - label: "\"45Z: Cliff jumping\" (Matt Gammans, Substack)"
      url: "https://mattgammans.substack.com/p/45z-cliff-jumping"
    - label: "\"45Z: How will refineries decarbonize?\" (Matt Gammans, Substack)"
      url: "https://mattgammans.substack.com/p/45z-how-will-refineries-decarbonize"
      note: "(what a plant's own options cost per point)"
sources:
  - "Carbon scores: USDA Feedstock Carbon Intensity Calculator (FD-CIC v1.2, September 2026), for each county's soil and climate region (USDA MLRA), with 2022 Census of Agriculture county corn yields and no manure or nitrification inhibitor. Nitrogen scenarios: 150, 180 (default), and 210 lb per acre, or 0.8 and 0.95 lb per bushel of county yield."
  - "Value: the difference from the default score the plant's model (DOE 45ZCF-GREET) gives undocumented corn, 6,040.6 g CO2e per bushel (the OCW calculator's \"% below default\" uses USDA's slightly lower national average, 6,019.5) at the 2026 credit of $1.09 per gallon (IRS Notice 2026-41), assuming the reduction passes fully into the fuel's score as in DOE's 45ZCF-GREET model (September 2026 manual). Values below the default are shown as no value."
  - "Documentation and practice rules: USDA, Technical Guidelines for the Production of Regenerative Agricultural Biofuel Feedstocks, 7 CFR Part 2100 (91 FR 39334, June 29, 2026); IRS Notice 2026-53."
  - "\"Will plants compete?\" asks two questions. First, would plants within 50 miles fall short of a full 5-point step from nearby documented corn? This assumes half of growers with qualifying fields document them, corn is no-tilled at 75% of the all-cropland rate in the 2022 Census, and 0.95 lb of nitrogen per bushel. Second, does more than one company buy there? Plants owned by the same company count as one buyer. Plants' own carbon scores aren't public. An illustration, not a forecast."
  - "Plants: EPA Facility Registry Service locations; nameplate capacity from <a href=\"https://www.eia.gov/petroleum/ethanolcapacity/\">EIA, U.S. Fuel Ethanol Plant Production Capacity</a> (as of January 1, 2025). Indiana and Michigan plants within 100 miles of Ohio count as competing buyers; the three Indiana plants whose 50-mile circles take at least a tenth of their corn from Ohio (Union City, Portland, Bluffton) appear in section 4 alongside the Ohio plants. Corn intake at 2.9 gallons per bushel; one step = $1.09 &times; 0.1 per gallon &times; capacity."
  - "Plant positions (4a): The Andersons Q1&ndash;Q2 2026 results; Valero Q3 2026 10-Q and Q1 2026 call; California LCFS current fuel pathways (October 2026); EPA Greenhouse Gas Reporting Program (2021&ndash;2023); EPA Renewable Fuel Standard efficient-producer determinations. None is a 45Z score. We set the bands by judgment and the project notes explain each one. Owners that report give company-wide averages, not plant scores."
  - "Plant need and nearby supply (4b): one step is 5 points on the fuel's carbon score (5 kg CO2e per million BTU &times; 0.07633 million BTU per gallon), about 0.38 kg CO2e per gallon of ethanol or 1.1 kg per bushel the plant buys. A documented no-till bushel cuts about 2.3&ndash;2.6 kg around the western plants and 1.7 kg around Coshocton (3.6&ndash;3.9 and 2.9 kg with a cover crop as well), averaged over where each plant's no-till corn is, at 0.95 lb of nitrogen per bushel; need is shown in no-till bushels. The Census reports practices by county, so each county's corn is spread evenly over its area, the share inside a plant's 50-mile circle counts, and where circles overlap a county's corn is split among the plants by capacity times area share, so no bushel is counted twice. Corn no-till at 75% of the all-cropland Census rate (50% as an option). Supply is counted by the carbon it cuts and expressed in no-till bushels (a no-till bushel with a cover crop counts about 1.6, a cover crop alone about 0.7), so the two bars share a unit and their ratio is supply &divide; need. The Census does not say how many no-till fields also have cover crops; the central case treats the two as unrelated (about 1 in 12 no-till corn acres). The toggle's 1 in 4 and 1 in 2 options add cover crops to no-till corn beyond what the Census counts (roughly 1.6 and 2.5 times the Census cover-crop acreage), so they are adoption scenarios, not a different reading of the Census. Supply assumes documented bushels reach the plant ahead of other buyers. Section 4c uses the same two tests as the county map's <em>Will plants compete?</em> view (above)."
  - "This page is educational and is not tax, legal, or marketing advice. Figures are estimates, not offers. The OCW 45Z calculator is Ohio Corn &amp; Wheat's tool; this page is an independent Ohio State analysis."
correction: "<strong>Draft &amp; corrections.</strong> Our carbon scores match USDA's Excel calculator in 30 test cases. Estimates may change with Treasury's final 45Z rule. If you find an error, please report it to <a href=\"mailto:lade.10@osu.edu\">lade.10@osu.edu</a> and we'll correct it."
---
