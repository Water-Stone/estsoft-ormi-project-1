import data from "/js/data";

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

export const sendSentence = (sentence) => {
    if (sentence) {
        data.push({
            role: "user",
            content: sentence,
        });
    }
};

export const apiPost = async () => {
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
        const result = JSON.parse(jres.choices[0].message.content);

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
