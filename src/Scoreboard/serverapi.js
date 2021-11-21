// const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";

export async function getDataFromDatabase() {
    let scoreData = [];
    await fetch("https://sheltered-forest-46021.herokuapp.com/get_scores", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            scoreData = data.data[0];
        });

    console.log("scoreData", scoreData);
    return scoreData;
}
