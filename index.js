/*
- 발생한 Warns:
1. cdn.tailwindcss.com should not be used in production.
To use Tailwind CSS in production, install it as a PostCSS plugin 
or use the Tailwind CLI: https://tailwindcss.com/docs/installation

2. warn - No utility classes were detected in your source files.
If this is unexpected, double-check the `content` option 
in your Tailwind CSS configuration.
https://tailwindcss.com/docs/content-configuration
 */
const $form = document.querySelector("form");
const $input_place = document.querySelector("#place");
const $input_days = document.querySelector("#days");
const $input_mustgo = document.querySelector("#mustgo");
const $input_rented = document.getElementById("rented_true");
const $before_text = document.getElementById("before_text");
const $loading_img = document.getElementById("loading");
const $schedule_print_area = document.querySelector("#result");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 입력
let place, days, mustgo, rented;

// 질문과 답변 저장
let data = [
    {
        role: "system",
        content: "assistant는 여행 전문가이다.",
    },
    {
        role: "user",
        content:
            "제주도에서의 4일 여행 일정을 만들어줘. 일정에 꼭 들어가야하는 장소는 성산일출봉이야. 나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어.",
    },
    {
        role: "assistant",
        content: `day1: 오전에는 한라산 등반, 오후에는 천지연 폭포를 방문하고 저녁에는 동문시장에 가는 것을 추천합니다.
        day2: 오전에는 일정에 꼭 들어가야했던 성산일출봉을 방문하고, 오후에는 우도 일일투어, 저녁에는 서귀포 맛집탐방을 추천합니다.
        day3: 오전에는 가볍게 카페 투어를 먼저 하고, 오후에는 산방산성재배지를 방문하고 저녁에는 한림해수욕장에서 바베큐파티를 즐겨보세요.
        day4: 오전에는 제주도민 손맛 박물관, 오후에는 제주프리랜드를 방문하고 여행의 마지막 저녁에는 호텔 뷔페를 만끽하세요.`,
    },
    {
        role: "user",
        content:
            "제주도에서의 4일 여행 일정을 만들어줘. 일정에 꼭 들어가야하는 장소는 성산일출봉이야. 나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어. 결과는 문장은 제외하고 json으로만 해줘.",
    },
    {
        role: "assistant",
        content: `{ "day1": {"오전": "한라산 등반", "오후": "천지연 폭포", "저녁": "동문시장"},
        "day2": {"오전": "성산일출봉","오후": "우도 일일투어","저녁": "서귀포 맛집탐방"},
        "day3": {"오전": "카페 투어","오후": "산방산성재배지","저녁": "한림해수욕장 바베큐파티"},
        "day4": {"오전": "제주도민 손맛 박물관","오후": "제주프리랜드","저녁": "마지막 저녁은 호텔 뷔페"}}`,
    },
];

// input 받아오기
$input_place.addEventListener("input", (e) => {
    place = $input_place.value;
});

$input_days.addEventListener("input", (e) => {
    days = $input_days.value;
});

$input_mustgo.addEventListener("input", (e) => {
    mustgo = $input_mustgo.value;
});

$input_rented.addEventListener("input", (e) => {
    if ($input_rented.checked == true) {
        rented = "나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어.";
    } else {
        rented =
            "나는 자동차가 없으니 여행 중 이동 거리는 가능한 짧게 계획해줘.";
    }
});

const merge_sentence = (place, days, mustgo, rented) => {
    request_sentence =
        place +
        "에서의 " +
        days +
        " 여행 일정을 만들어줘. 일정에 꼭 들어가야하는 장소는 " +
        mustgo +
        "이야." +
        rented +
        " 결과는 문장은 제외하고 json으로만 해줘.";
    return request_sentence;
};

// 사용자의 질문을 객체를 만들어서 push
const sendSentence = (request_sentence) => {
    if (request_sentence) {
        data.push({
            role: "user",
            content: request_sentence,
        });
    }
};

// 화면에 답변 그려주는 함수
const printAnswer = (_json) => {
    // 날짜별로 day1, day2... 카드 만들기
    for (const key_day in _json) {
        if (Object.hasOwnProperty.call(_json, key_day)) {
            let currDayCard = document.createElement("ul");
            currDayCard.innerText = "■ " + key_day;
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
            $schedule_print_area.appendChild(currDayCard);
        }
    }

    // for (const scdl of _json) {
    //     let currDayCard = document.createElement("div");
    //     // currDayCard.classList.add(
    //     //     "block border border-gray-400 bg-gray-200 py-4 w-full rounded"
    //     // );
    //     // 오전, 오후, 저녁 등 세부 스케줄별로 li
    //     for (const dtl of scdl) {
    //         let li = document.createElement("li");
    //         console.log(dtl);
    //         li.innerText = dtl.key() + ": " + dtl.value();
    //         currDayCard.appendChild(li);
    //     }
    //     $schedule_print_area.appendChild(currDayCard);
    // }
};

// api 요청보내는 함수
const apiPost = async () => {
    $before_text.classList.add("hidden");
    $loading_img.classList.remove("hidden");

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => res.json())
        .then((res) => {
            $loading_img.classList.add("hidden");
            const jed = JSON.stringify(
                JSON.parse(res.choices[0].message.content)
            );
            // console.log(jed);
            // console.log(JSON.parse(jed));
            printAnswer(JSON.parse(jed));
        })
        .catch((err) => {
            $before_text.classList.remove("hidden");
            console.log(err);
        });
};

// submit
$form.addEventListener("submit", (e) => {
    e.preventDefault();
    $input_place.value = null;
    $input_days.value = null;
    $input_mustgo.value = null;
    let request_sentence_form = merge_sentence(place, days, mustgo, rented);
    sendSentence(request_sentence_form);
    apiPost();
});
