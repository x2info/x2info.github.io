---
title: "Tools"
layout: archive
permalink: /Tools
author_profile: true
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.Tools %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}