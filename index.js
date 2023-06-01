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
import data from "./data/data.js";

const $form = document.querySelector("form");
const $input_place = document.querySelector("#place");
const $input_days = document.querySelector("#days");
const $input_mustgo = document.querySelector("#mustgo");
const $input_rented_radios = document.querySelectorAll("input[name='rented'");
const $before_text = document.getElementById("before_text");
const $loading_img = document.getElementById("loading");
const $schedule_print_area = document.querySelector("#result");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 입력
let place, days, mustgo, rented;

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

$input_rented_radios.forEach((rd) => {
    rd.addEventListener("change", (e) => {
        if (e.currentTarget.checked) {
            if (JSON.parse(e.currentTarget.value)) {
                rented =
                    "나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어.";
            } else {
                rented =
                    "나는 자동차가 없으니 여행 중 이동 거리는 가능한 짧게 계획해줘.";
            }
        }
    });
});

// $input_rented.addEventListener("input", (e) => {
//     if ($input_rented.checked == true) {
//         rented = "나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어.";
//     } else {
//         rented =
//             "나는 자동차가 없으니 여행 중 이동 거리는 가능한 짧게 계획해줘.";
//     }
// });

const merge_sentence = (place, days, mustgo, rented) => {
    const request_sentence =
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
            $schedule_print_area.appendChild(currDayCard);
        }
    }
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
            // console.log(res);
            $loading_img.classList.add("hidden");
            const jed = JSON.stringify(
                JSON.parse(res.choices[0].message.content)
            );
            console.log(jed);
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
    console.log(place, days, mustgo, rented.substr(5, 9));
    $input_place.value = null;
    $input_days.value = null;
    $input_mustgo.value = null;
    let request_sentence_form = merge_sentence(place, days, mustgo, rented);
    sendSentence(request_sentence_form);
    apiPost();
});
