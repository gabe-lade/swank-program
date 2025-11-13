---
title: Team
nav:
  order: 2
  tooltip: Meet our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

The Swank Program brings together researchers, students, and practitioners working on rural-urban policy and economic development.

{% include section.html %}

## Program Leadership

{% include list.html data="members" component="portrait" filter="role == 'pi'" %}

{% include section.html %}

## Program Members

{% include list.html data="members" component="portrait" filter="role != 'pi'" %}

<!--
To add team members, create markdown files in the _members/ directory with the following format:

---
name: Name Here
image: images/team/photo.jpg
role: pi  (or postdoc, phd, undergrad, etc.)
affiliation: The Ohio State University
links:
  home-page: https://example.com
  email: name@osu.edu
  twitter: handle
  github: username
---

Bio text here...
-->
