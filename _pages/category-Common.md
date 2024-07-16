---
title: "Common"
layout: archive
permalink: /Common
author_profile: true
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.Common %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
