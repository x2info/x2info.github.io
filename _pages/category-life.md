---
title: "Life"
layout: archive
permalink: categories/life
author_profile: true
sidebar:
    nav: docs
---

{% assign posts = site.categories.life %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
