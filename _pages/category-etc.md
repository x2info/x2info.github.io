---
title: "ETC"
layout: archive
permalink: /etc/
author_profile: true
sidebar:
    nav: docs
---

{% assign posts = site.categories.etc %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}

{% for category in site.categories %}
    {% if category[0] == "cpp" %}
    {% endif %}
{% endfor %}
