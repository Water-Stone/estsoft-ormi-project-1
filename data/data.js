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
    {
        role: "user",
        content:
            "서울에서의 2일 여행 일정을 만들어줘. 일정에 꼭 들어가야하는 장소는 보신각이야. 나는 자동차가 없으니 여행 중 이동 거리는 가능한 짧게 계획해줘. 결과는 문장은 제외하고 json으로만 해줘.",
    },
    {
        role: "assistant",
        content: `{"day1":{"오전":"보신각","오후":"광화문광장","저녁":"을지로"},"day2":{"오전":"경복궁","오후":"대한민국 역사박물관","저녁":"덕수궁"}}`,
    },
    {
        role: "user",
        content:
            "서울에서의 2일 여행 일정을 만들어줘. 일정에 꼭 들어가야하는 장소는 보신각이야. 나는 자동차가 있으니 여행 중 이동 거리에 크게 제약은 없어. 결과는 문장은 제외하고 json으로만 해줘.",
    },
    {
        role: "assistant",
        content: `{"day1":{"오전":"보신각","오후":"남산 케이블카","저녁":"남대문시장"},"day2":{"오전":"이화동 벽화마을","오후":"코엑스 아쿠아리움","저녁":"강남 클럽"}}`,
    },
];

export default data;
