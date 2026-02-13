---
layout: default
title: ""
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
            {% if pub.url != "" %}
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
          {% if pub.url != "" or pub.ungated != "" or pub.code != "" %}
          <div class="pub-links">
            {% if pub.url != "" %}<a href="{{ pub.url }}" class="pub-link">Paper</a>{% endif %}
            {% if pub.ungated != "" %}<a href="{{ pub.ungated }}" class="pub-link">Ungated</a>{% endif %}
            {% if pub.code != "" %}<a href="{{ pub.code }}" class="pub-link">Code</a>{% endif %}
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
            {% if pub.url != "" %}
              <a href="{{ pub.url }}">{{ pub.title }}</a>
            {% else %}
              {{ pub.title }}
            {% endif %}
          </p>
          <p class="pub-authors">{{ pub.authors }}</p>
          <p class="pub-venue">{{ pub.journal }}, {{ pub.year }}</p>
          {% if pub.url != "" or pub.ungated != "" or pub.code != "" %}
          <div class="pub-links">
            {% if pub.url != "" %}<a href="{{ pub.url }}" class="pub-link">Paper</a>{% endif %}
            {% if pub.ungated != "" %}<a href="{{ pub.ungated }}" class="pub-link">Ungated</a>{% endif %}
            {% if pub.code != "" %}<a href="{{ pub.code }}" class="pub-link">Code</a>{% endif %}
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
            {% if pub.url != "" %}
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
