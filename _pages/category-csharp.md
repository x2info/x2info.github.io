---
title: "C#"
layout: archive
permalink: /csharp
author_profile: true
sidebar:
    nav: "sidebar-category"
---

{% assign posts = site.categories.csharp %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
