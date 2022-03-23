---
layout: archive
title: "Portfolio"
permalink: /portfolio
author_profile: true
---

<div class="grid__wrapper">
{% assign posts = site.categories.portTest %}
{% for post in posts %}    
  {% include archive-single.html type="grid" %} 
{% endfor %}
</div>