// modules/userInput.js

let place, days, mustgo, rented;

export const handlePlaceInput = (value) => {
    place = value;
};

export const handleDaysInput = (value) => {
    days = value;
};

export const handleMustGoInput = (value) => {
    mustgo = value;
};

export const handleRentedInput = (value) => {
    if (JSON.parse(value)) {
        rented = "나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어.";
    } else {
        rented =
            "나는 자동차가 없으니 여행 중 이동 거리는 가능한 짧게 계획해줘.";
    }
};

export const getUserInput = () => {
    return { place, days, mustgo, rented };
};
