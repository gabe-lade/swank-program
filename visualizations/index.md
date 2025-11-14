---
title: Data Visualizations
nav:
  order: 7
  tooltip: Interactive data visualizations
---

# {% include icon.html icon="fa-solid fa-chart-line" %}Data Visualizations

Explore interactive visualizations examining urbanization, economic trends, and policy impacts in Ohio and beyond.

{% include section.html %}

## Available Visualizations

{% capture text %}

Interactive maps and analysis examining urban conversion patterns and development trends across Ohio counties.

{%
  include button.html
  link="visualizations/urbanization-ohio"
  text="Explore Visualization"
  icon="fa-solid fa-arrow-right"
  flip=true
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="visualizations/urbanization-ohio"
  title="Measuring Urbanization in Ohio"
  text=text
%}

<!--
To add more visualizations:

1. Create a new subpage in the visualizations/ directory (e.g., visualizations/new-viz.md)
2. Add the visualization using an iframe or other method
3. Add a feature block above linking to the new page

Example feature block:

{% capture text %}

Description of the visualization...

{%
  include button.html
  link="visualizations/new-viz"
  text="Explore Visualization"
  icon="fa-solid fa-arrow-right"
  flip=true
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="visualizations/new-viz"
  title="Visualization Title"
  flip=true
  text=text
%}

-->
