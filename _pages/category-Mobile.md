---
title: "Mobile"
layout: archive
permalink: /Mobile
author_profile: true
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.Mobile %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
