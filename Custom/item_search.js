document.addEventListener("DOMContentLoaded", async () => {

    const single_input = document.getElementById("single_keyword");
    const single_suggestion = document.getElementById("single_suggestion");

    let weaponList = [];
    let armourList = [];
    let othersList = [];


    try {
        const response = await fetch("/Custom/unique_items.json");
        const data = await response.json();
        weaponList = data.weapon || [];
        armourList = data.armour || [];
        othersList = data.others || [];
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

        const itemList = [...weaponList, ...armourList, ...othersList];

        for (const item of itemList) {
            if (
                (item["Name-EN"].toLowerCase().includes(inputText) || item["Name-KR"].includes(inputText)) &&
                !seen.has(item["Name-EN"])
            ) {
                matches.push(item);
                seen.add(item["Name-EN"]);
            }
        }

        if (matches.length > 0) {
            matches.forEach(item => {
                const result_div = document.createElement("div");

                const link = document.createElement("a");
                link.textContent = `${item["Name-EN"]} / ${item["Name-KR"]}`;
                link.href = item.Link;
                link.target = "_blank";
                result_div.appendChild(link);

                result_div.addEventListener("click", () => {
                    single_suggestion.innerHTML = "";
                    single_suggestion.style.display = "none";
                });

                single_suggestion.appendChild(result_div);
            });

            single_suggestion.style.display = "block";
        } else {
            single_suggestion.style.display = "none";
        }
    });
    
});
