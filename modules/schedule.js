const $schedulePrintArea = document.getElementById("result");

const printAnswer = (_json) => {
    console.log("printAnswer 진입");
    console.log(_json);
    // 날짜별로 day1, day2... 카드 만들기
    for (const key_day in _json) {
        if (Object.hasOwnProperty.call(_json, key_day)) {
            let currDayCard = document.createElement("ul");
            currDayCard.innerText = "■ " + key_day.toUpperCase();
            const detail = _json[key_day];
            for (const key_dtl in detail) {
                // 오전, 오후, 저녁 등 세부 스케줄별로 li
                if (Object.hasOwnProperty.call(detail, key_dtl)) {
                    const dtl_content = detail[key_dtl];
                    let li = document.createElement("li");
                    li.innerText = "- " + key_dtl + ": " + dtl_content;
                    currDayCard.appendChild(li);
                }
            }
            $schedulePrintArea.appendChild(currDayCard);
        }
    }
};

export { printAnswer };
