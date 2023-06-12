import { printAnswer } from "../modules/schedule.js";
import { sendSentence, apiPost } from "./modules/api.js";
import {
    handlePlaceInput,
    handleDaysInput,
    handleMustGoInput,
    handleRentedInput,
    getUserInput,
} from "./modules/userInput.js";

const $form = document.querySelector("form");
const $input_place = document.querySelector("#place");
const $input_days = document.querySelector("#days");
const $input_mustgo = document.querySelector("#mustgo");
const $input_rented_radios = document.querySelectorAll("input[name='rented'");
const $before_text = document.getElementById("before_text");
const $loading_img = document.getElementById("loading");

// input 받아오기
$input_place.addEventListener("input", (e) => {
    handlePlaceInput($input_place.value);
});

$input_days.addEventListener("input", (e) => {
    handleDaysInput($input_days.value);
});

$input_mustgo.addEventListener("input", (e) => {
    handleMustGoInput($input_mustgo.value);
});

$input_rented_radios.forEach((rd) => {
    rd.addEventListener("change", (e) => {
        handleRentedInput(e.currentTarget.value);
    });
});

const merge_sentence = (userInput) => {
    const request_sentence =
        userInput.place +
        "에서의 " +
        userInput.days +
        " 여행 일정을 만들어줘. 일정에 꼭 들어가야하는 장소는 " +
        userInput.mustgo +
        "이야." +
        userInput.rented +
        " 결과는 문장은 제외하고 json으로만 해줘.";
    return request_sentence;
};

// submit
$form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInput = getUserInput();
    if (
        !userInput.place ||
        !userInput.days ||
        !userInput.mustgo ||
        !userInput.rented
    ) {
        // 필수 입력 항목이 비어있을 경우 처리
        alert("모든 항목을 입력해주세요.");
        return;
    }

    $before_text.classList.add("hidden");
    $loading_img.classList.remove("hidden");

    $input_place.value = null;
    $input_days.value = null;
    $input_mustgo.value = null;

    let request_sentence_form = merge_sentence(userInput);
    sendSentence(request_sentence_form);
    try {
        const result = await apiPost();
        if (result) {
            printAnswer(result);
        } else {
            console.log("API 요청 실패");
        }
        $loading_img.classList.add("hidden");
    } catch (error) {
        $before_text.classList.remove("hidden");
        console.log("API 요청 실패");
    }
});
