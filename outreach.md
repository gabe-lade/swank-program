---
layout: default
title: "Outreach"
permalink: /outreach/
description: "Newsletter, presentations, policy briefs, and media coverage from the Swank Program in Rural-Urban Policy."
---

<article class="page">
  <header class="page-header">
    <h1>Outreach</h1>
  </header>

  <div class="page-content">
    <!-- Newsletter Section -->
    <section class="outreach-section">
      <h2>Newsletter</h2>
      <p class="section-intro">
        The Swank Program publishes a <a href="https://gelade1.substack.com">regular newsletter on Substack</a> covering research findings, policy developments, and data insights relevant to rural-urban policy in Ohio and across the United States.
      </p>
      <div class="outreach-list">
        {% for item in site.data.newsletters %}
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="{{ item.url }}">{{ item.title }}</a></p>
          <span class="outreach-entry-meta">{{ item.date }}</span>
        </div>
        {% endfor %}
      </div>
    </section>

    <!-- Presentations Section -->
    <section class="outreach-section">
      <h2>Presentations</h2>
      <div class="outreach-list">
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://gabe-lade.github.io/MyFiles/property-tax-reform-202602.pdf">Ohio's Historic Property Tax Reforms: An Economist's Perspective</a>. February 2026.</p>
        </div>
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://github.com/gabe-lade/MyFiles/blob/master/biofuels-policy-primer-v2.pdf">Renewable Fuels Standard Policy Primer</a>. February 2026.</p>
        </div>
      </div>
    </section>

    <!-- Policy Briefs Section -->
    <section class="outreach-section">
      <h2>Policy Briefs</h2>
      <div class="outreach-list">
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://theconversation.com/millions-of-people-across-the-us-use-well-water-but-very-few-test-it-often-enough-to-make-sure-its-safe-236930">Millions of People Across the US Use Well Water, but Very Few Test It Often Enough to Make Sure It's Safe</a>. <em>The Conversation</em>. October 2024.</p>
        </div>
      </div>
    </section>

    <!-- Recent Media Section -->
    <section class="outreach-section">
      <h2>Recent Media</h2>
      <div class="outreach-list">
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://spectrumnews1.com/oh/toledo/news/2026/02/19/data-centers-bring-money-and-pushback">Data Centers Bring Money and Pushback</a>. <em>Spectrum News 1</em>. February 2026.</p>
        </div>
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://ocj.com/2025/12/ohio-ag-net-podcast-ep-424-the-future-of-biofuels/">Ohio Ag Net Podcast – Ep. 424 – The Future of Biofuels</a>. <em>Ohio's Country Journal</em>. December 2025.</p>
        </div>
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://advancedbiofuelsusa.info/biofuels-forum-highlights-policy-markets-and-the-future-of-rural-energy">Biofuels Forum Highlights Policy, Markets and the Future of Rural Energy</a>. <em>Advanced Biofuels USA</em>. December 2025.</p>
        </div>
        <div class="outreach-entry">
          <p class="outreach-entry-title"><a href="https://www.northwestsignal.net/article_d5c68034-2249-5561-8ea6-f9c63eb0e61b.html">Biofuels Forum Highlights Policy, Markets and the Future of Rural Energy</a>. <em>Northwest Signal</em>. December 2025.</p>
        </div>
      </div>
    </section>
  </div>
</article>
