import Header from "../components/Header/Header";
import { getDataFromDatabase } from "./serverapi";
import Table from "./Table";
import { useEffect, useState } from "react";
// import useFetch from "react-fetch-hook";

function Scoreboard() {
    const [scoreData, setScoreData] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedData = await getDataFromDatabase();
            setScoreData(fetchedData);
        })();
    }, []);

    let data = [
        { USERNAME: "Apple", SCORE: 100 },
        { USERNAME: "Orange", SCORE: 50 },
        { USERNAME: "Banana", SCORE: 35 },
        { USERNAME: "Mango", SCORE: 70 },
        { USERNAME: "Pineapple", SCORE: 45 },
        { USERNAME: "Papaya", SCORE: 40 },
        { USERNAME: "Watermelon", SCORE: 35 },
    ];
    return (
        <div>
            <Header />
            <Table data={scoreData} />
        </div>
    );
}

export default Scoreboard;
