---
title:  "Notice 기능 사용하기"
categories:
  - portTest
tags:
  - [Blog, jekyll, Github, Git]

header:
  teaser: "/images/default.png"

---

> Code

```html
<div class="notice--info" markdown="1">
  <h4>이것은 Noitce 입니다. class 설정 가능한 타입은 아래와 같습니다.</h4>
  <li>notice--warning</li>
  <li>notice--danger</li>
  <li>notice--success</li>
  <li>추가적은 것은 Minimal-Jekyll 공식 페이지에서 확인하세요</li>
</div>
```

> 결과
<div class="notice--warning" markdown="1">
  <h4>이것은 notice--warning 입니다.</h4>
</div>

<div class="notice--danger" markdown="1">
  <h4>이것은 notice--danger 입니다.</h4>
</div>

<div class="notice--success" markdown="1">
  <h4>이것은 notice--success 입니다.</h4>
</div>
