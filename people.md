---
layout: default
title: "People"
permalink: /people/
---

<article class="page">
  <header class="page-header">
    <h1>People</h1>
  </header>

  <div class="page-content">
    <!-- Faculty Section -->
    <section class="people-section">
      <h2>Faculty</h2>
      {% for person in site.data.people.faculty %}
      <div class="faculty-featured">
        <img
          src="{{ person.photo | relative_url }}"
          alt="Photo of {{ person.name }}"
          class="faculty-photo"
          loading="lazy"
        >
        <div class="faculty-info">
          <h3>{{ person.name }}</h3>
          <p class="faculty-title">{{ person.title }}</p>
          <p class="faculty-dept">{{ person.department }}<br>{{ person.university }}</p>
          <p class="faculty-bio">{{ person.bio }}</p>
          {% if person.website %}
          <a href="{{ person.website }}" class="faculty-link" target="_blank" rel="noopener">Personal website &rarr;</a>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </section>

    <!-- Students Section -->
    <section class="people-section">
      <h2>Students</h2>
      <!-- To add new students, edit _data/people.yml and add entries under "students" -->
      <div class="people-grid">
        {% for person in site.data.people.students %}
          {% if person.name == "TBD" %}
          <div class="placeholder-note" style="grid-column: 1 / -1;">
            Additional team members will be listed here as the program grows.
          </div>
          {% else %}
          <div class="person-card">
            <img
              src="{{ person.photo | relative_url }}"
              alt="Photo of {{ person.name }}"
              class="person-photo"
              loading="lazy"
            >
            <h3>{{ person.name }}</h3>
            <p class="person-role">{{ person.title }}</p>
            {% if person.website %}
            <a href="{{ person.website }}" target="_blank" rel="noopener">Website</a>
            {% endif %}
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>

    <!-- Affiliates Section -->
    <section class="people-section">
      <h2>Affiliates</h2>
      <!-- To add new affiliates, edit _data/people.yml and add entries under "affiliates" -->
      <div class="people-grid">
        {% for person in site.data.people.affiliates %}
          {% if person.name == "TBD" %}
          <div class="placeholder-note" style="grid-column: 1 / -1;">
            Affiliated researchers and collaborators will be listed here.
          </div>
          {% else %}
          <div class="person-card">
            <img
              src="{{ person.photo | relative_url }}"
              alt="Photo of {{ person.name }}"
              class="person-photo"
              loading="lazy"
            >
            <h3>{{ person.name }}</h3>
            <p class="person-role">{{ person.title }}</p>
            {% if person.website %}
            <a href="{{ person.website }}" target="_blank" rel="noopener">Website</a>
            {% endif %}
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>

    <!-- Advisory Board Section -->
    <section class="people-section">
      <h2>Advisory Board</h2>
      <!-- To add advisory board members, edit _data/people.yml and add entries under "advisory_board" -->
      <div class="people-grid">
        {% for person in site.data.people.advisory_board %}
          {% if person.name == "TBD" %}
          <div class="placeholder-note" style="grid-column: 1 / -1;">
            Advisory board members will be listed here as the board is established.
          </div>
          {% else %}
          <div class="person-card">
            <img
              src="{{ person.photo | relative_url }}"
              alt="Photo of {{ person.name }}"
              class="person-photo"
              loading="lazy"
            >
            <h3>{{ person.name }}</h3>
            <p class="person-role">{{ person.title }}</p>
            {% if person.website %}
            <a href="{{ person.website }}" target="_blank" rel="noopener">Website</a>
            {% endif %}
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>
  </div>
</article>
