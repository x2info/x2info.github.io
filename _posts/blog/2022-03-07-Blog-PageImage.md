---
title: "Page Image사용하기"
header:
    overlay_image: 
    overlay_filter: 0.7 # same as adding an opacity of 0.5 to a black background
    caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
excerpt: "VS Code에서 Paste Image Extension에 대한 사용법을 설명합니다."
categories:
  - Minimal-Mistakes
tags:
  - [Blog, jekyll, Github, Git]

toc: true
toc_sticky: true
 
# date: 2020-05-25
# last_modified_at: 2020-05-25

---
## 0️⃣ 실행 환경
<div class="notice--info">
  <li>Tool: VS Code</li>
  <li>OS: Windows 10</li>
  <li>Blog Thema: Minimal-Jekyll</li>
</div>

## 1️⃣ 다운로드 
[Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)
는 VS Code 확장 플러그인으로 Markdown 환경에서 이미지를 쉽게 넣을 수 있는 기능을 제공합니다. VS Code에서 블로그를 작성하는 경우 반드시 설치해야 되는 플러그입니다. VS Code 또한 Markdown 툴로도 훌륭합니다.


## 2️⃣ 설정

다운로드가 완료 되면 아래의 그림처럼 톱니바퀴 아이콘을 눌러 설정에 들어갑니다.

![](/images/20220307173340.png)


우리가 설정 해야 될 부분은 2가지(Paste Image:Path, Paste Image:Prefix) 입니다.  
아래와 같이 설정 합니다.  
- Paste Image - Path : ${projectRoot}/images/
  - 이미지를 Ctrl+Alt+V로 붙여 넣었을 때 복사할 경로를 지정합니다.
  - ${projectRoot}의 의미는 VS Code에서 Open된 최상위 경로를 의미합니다.
  - 만약 C:\Blog을 VS Code로 열었다면, C:\Blog로 치환되므로, C:\Blog\Images에 이미지가 저장됩니다.
- Paste Image - Prefix : /images/
  - 이미지를 붙여 넣을 때 앞에 경로 혹은 다른 이름을 붙여 줄 수 있습니다.
  - 우리는 /images에 이미지를 저장하고 불러올 것이므로 위와 같이 설정합니다.


![](/images/20220307174643.png)


## 3️⃣ 결과  

이미지를 Ctrl+Alt+V로 붙여 넣으며, 아래와 같이 생성된다.
```
![](/images/20220307174643.png)
```

Git Commit 이후 Github Page에서 확인해보면 정상적으로 이미지가 출력된다.  
현재 Typora는 유료화 되어 있으며, 내가 원하는 기능이 없어서 당분간은 VS Code를 사용할 예정이다.