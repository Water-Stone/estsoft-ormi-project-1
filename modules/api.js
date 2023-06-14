import data from "./../js/data.js";

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

const sendSentence = (sentence) => {
    if (sentence) {
        data.push({
            role: "user",
            content: sentence,
        });
    }
};

const apiPost = async () => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            redirect: "follow",
        });
        const jres = await res.json();
        // console.log(jres);
        const result = JSON.parse(jres.choices[0].message.content);
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { sendSentence, apiPost };
