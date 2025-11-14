# C. William Swank Program Website Setup Guide

This site is configured to be hosted at: https://gabe-lade.github.io/swank-program/

## Quick Start

1. **Enable GitHub Pages**: Go to repository Settings > Pages > Set source to the branch with your code
2. **Add content**: Follow the instructions below to populate each page
3. **Add images**: Place images in the `images/` directory

## Page Structure

### Landing Page (`index.md`)
- Replace the placeholder text with content from: https://aede.osu.edu/endowed-programs/c-william-swank-program-rural-urban-policy
- Update the intro paragraph to match the official program description

### Mission Page (`mission/index.md`)
- Fill in the mission statement, vision, and values sections
- Add any program goals or objectives

### Team Page (`team/index.md`)
- Add team members by creating files in `_members/` directory
- Example format:
  ```yaml
  ---
  name: Your Name
  image: images/team/yourname.jpg
  role: pi  # or: postdoc, phd, masters, undergrad, programmer, etc.
  affiliation: The Ohio State University
  links:
    email: name@osu.edu
    twitter: handle
    github: username
    home-page: https://yoursite.com
  ---

  Bio text here...
  ```

### Newsletter Page (`newsletter/index.md`)
- Add your Substack posts in reverse chronological order
- Update the Substack subscription link
- Follow the commented format in the file for adding posts

### Research Page (`research/index.md`)
- Add publications in reverse chronological order
- Follow the format from: https://cail.ucdavis.edu/category/publications/
- Can use the citation component for DOI-based citations
- Organize into: Recent Publications, Working Papers, Policy Briefs

### Data Visualizations (`visualizations/index.md`)
- Main page lists all available visualizations
- Each visualization has its own subpage
- Example subpage: `visualizations/urbanization-ohio.md`
- To add a new visualization:
  1. Create a new .md file in `visualizations/`
  2. Add an iframe or embed code for your visualization
  3. Add a feature block on the main visualizations page linking to it

### Contact Page (`contact/index.md`)
- Update with specific contact information
- Add office hours or additional contact methods as needed

## Configuration

### Site Settings (`_config.yaml`)
- Site title, description configured for Swank Program
- baseurl set to `/swank-program` for GitHub Pages
- Update social media links as needed

### Navigation Order
1. Mission (order: 1)
2. Team (order: 2)
3. Research (order: 3)
4. Newsletter (order: 4)
5. Data Visualizations (order: 5)
6. Contact (order: 6)

## Adding Images

- Place team photos in `images/team/`
- Place general images in `images/`
- Update image paths in the markdown files

## Template Documentation

For more details on using the Greene Lab template features, see:
https://greene-lab.gitbook.io/lab-website-template-docs

## Need Help?

- Template issues: https://github.com/greenelab/lab-website-template/issues
- Jekyll documentation: https://jekyllrb.com/docs/
