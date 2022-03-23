---
title: "Life"
layout: archive
permalink: /life
author_profile: true
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.life %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
