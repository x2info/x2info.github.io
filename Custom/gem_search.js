document.addEventListener("DOMContentLoaded", async () => {
  const single_input = document.getElementById("single_keyword");
  const single_suggestion = document.getElementById("single_suggestion");

  const multi_input = document.getElementById("multi_keyword");
  const multi_suggestion = document.getElementById("multi_suggestion");

  let skillList = [];
  let supportList = [];

  try {
    const response = await fetch("/Custom/skill_gems.json");
    const data = await response.json();
    skillList = data.SkillGems || [];
    supportList = data.SupportGems || [];
  } catch (error) {
    console.error("JSON 데이터를 불러오는 중 오류 발생:", error);
  }

  single_input.addEventListener("input", () => {
    const inputText = single_input.value.trim().toLowerCase();

    single_suggestion.innerHTML = "";

    if (!inputText) {
      single_suggestion.style.display = "none";
      return;
    }

    let matches = [];
    let seen = new Set();

    const searchList = [...skillList, ...supportList];

    for (const skill of searchList) {
      if (
        (skill["Name-EN"].toLowerCase().includes(inputText) ||
          skill["Name-KR"].includes(inputText)) &&
        !seen.has(skill["Name-EN"])
      ) {
        matches.push(skill);
        seen.add(skill["Name-EN"]);
      }
    }

    if (matches.length > 0) {
      matches.forEach((skill) => {
        const item = document.createElement("div");

        const link = document.createElement("a");
        link.textContent = `${skill["Name-KR"]}(${skill["Name-EN"]}) - 등급: ${skill["Tier"]} `;
        link.href = skill.Link;
        link.target = "_blank";
        item.appendChild(link);

        item.addEventListener("click", () => {
          single_suggestion.innerHTML = "";
          single_suggestion.style.display = "none";
        });

        single_suggestion.appendChild(item);
      });

      single_suggestion.style.display = "block";
    } else {
      single_suggestion.style.display = "none";
    }
  });

  multi_input.addEventListener("input", () => {
    const inputText = multi_input.value.trim().toLowerCase();

    multi_suggestion.innerHTML = "";

    if (!inputText) {
      multi_suggestion.style.display = "none";
      return;
    }

    let matches = [];
    let seen = new Set();

    const searchList = [...skillList, ...supportList];

    for (const skill of searchList) {
      const skillName = skill["Name-EN"].toLowerCase().replace(/\s+/g, "");
      const regexEng = new RegExp(skillName, "gi");

      const skillNameKor = skill["Name-KR"].replace(/\s+/g, "").toLowerCase();
      const regexKor = new RegExp(skillNameKor, "gi");

      const inputTextNoSpace = inputText.replace(/\s+/g, "").toLowerCase();

      if (regexEng.test(inputTextNoSpace) || regexKor.test(inputTextNoSpace)) {
        if (!seen.has(skill["Name-EN"])) {
          matches.push(skill);
          seen.add(skill["Name-EN"]);
        }
      }
    }

    if (matches.length > 0) {
      matches.forEach((skill) => {
        const item = document.createElement("div");

        const link = document.createElement("a");
        link.textContent = `${skill["Name-KR"]}(${skill["Name-EN"]}) - 등급: ${skill["Tier"]} `;
        link.href = skill.Link;
        link.target = "_blank";
        item.appendChild(link);

        item.addEventListener("click", () => {
          multi_suggestion.innerHTML = "";
          multi_suggestion.style.display = "none";
        });

        multi_suggestion.appendChild(item);
      });

      multi_suggestion.style.display = "block";
    } else {
      multi_suggestion.style.display = "none";
    }
  });
});
