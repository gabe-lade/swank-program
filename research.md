---
layout: default
title: "Research"
permalink: /research/
---

<article class="page">
  <header class="page-header">
    <h1>Research</h1>
  </header>

  <div class="page-content">
    <!-- Working Papers -->
    <section class="pub-section">
      <h2>Working Papers</h2>
      <div class="pub-list">
        {% for pub in site.data.publications.working_papers %}
        <div class="pub-entry">
          <p class="pub-title">
            {% if pub.url and pub.url != "" %}
              <a href="{{ pub.url }}">{{ pub.title }}</a>
            {% else %}
              {{ pub.title }}
            {% endif %}
          </p>
          <p class="pub-authors">{{ pub.authors }}</p>
          {% if pub.journal %}
          <p class="pub-venue">{{ pub.journal }}, {{ pub.year }}</p>
          {% else %}
          <p class="pub-venue">{{ pub.year }}</p>
          {% endif %}
          {% assign has_links = false %}
          {% if pub.url and pub.url != "" %}{% assign has_links = true %}{% endif %}
          {% if pub.ungated and pub.ungated != "" %}{% assign has_links = true %}{% endif %}
          {% if pub.code and pub.code != "" %}{% assign has_links = true %}{% endif %}
          {% if has_links %}
          <div class="pub-links">
            {% if pub.url and pub.url != "" %}<a href="{{ pub.url }}" class="pub-link">Paper</a>{% endif %}
            {% if pub.ungated and pub.ungated != "" %}<a href="{{ pub.ungated }}" class="pub-link">Ungated</a>{% endif %}
            {% if pub.code and pub.code != "" %}<a href="{{ pub.code }}" class="pub-link">Code</a>{% endif %}
          </div>
          {% endif %}
        </div>
        {% endfor %}
      </div>
    </section>

    <!-- Published Papers -->
    <section class="pub-section">
      <h2>Published Papers</h2>
      <div class="pub-list">
        {% for pub in site.data.publications.published %}
        <div class="pub-entry">
          <p class="pub-title">
            {% if pub.url and pub.url != "" %}
              <a href="{{ pub.url }}">{{ pub.title }}</a>
            {% else %}
              {{ pub.title }}
            {% endif %}
          </p>
          <p class="pub-authors">{{ pub.authors }}</p>
          <p class="pub-venue">{{ pub.journal }}, {{ pub.year }}</p>
          {% assign has_links = false %}
          {% if pub.url and pub.url != "" %}{% assign has_links = true %}{% endif %}
          {% if pub.ungated and pub.ungated != "" %}{% assign has_links = true %}{% endif %}
          {% if pub.code and pub.code != "" %}{% assign has_links = true %}{% endif %}
          {% if has_links %}
          <div class="pub-links">
            {% if pub.url and pub.url != "" %}<a href="{{ pub.url }}" class="pub-link">Paper</a>{% endif %}
            {% if pub.ungated and pub.ungated != "" %}<a href="{{ pub.ungated }}" class="pub-link">Ungated</a>{% endif %}
            {% if pub.code and pub.code != "" %}<a href="{{ pub.code }}" class="pub-link">Code</a>{% endif %}
          </div>
          {% endif %}
        </div>
        {% endfor %}
      </div>
    </section>

    <!-- Policy Briefs -->
    <section class="pub-section">
      <h2>Policy Briefs</h2>
      <div class="pub-list">
        {% for pub in site.data.publications.policy_briefs %}
        <div class="pub-entry">
          <p class="pub-title">
            {% if pub.url and pub.url != "" %}
              <a href="{{ pub.url }}">{{ pub.title }}</a>
            {% else %}
              {{ pub.title }}
            {% endif %}
          </p>
          <p class="pub-authors">{{ pub.authors }}</p>
          <p class="pub-venue">{{ pub.year }}</p>
        </div>
        {% endfor %}
      </div>
    </section>
  </div>
</article>
