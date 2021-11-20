import Header from "../components/Header/Header";
import { getDataFromDatabase } from "./serverapi";
import Table from "./Table";

function Scoreboard() {
    getDataFromDatabase();
    let data = [
        { fruit: "Apple", cost: 100 },
        { fruit: "Orange", cost: 50 },
        { fruit: "Banana", cost: 35 },
        { fruit: "Mango", cost: 70 },
        { fruit: "Pineapple", cost: 45 },
        { fruit: "Papaya", cost: 40 },
        { fruit: "Watermelon", cost: 35 },
    ];
    return (
        <div>
            <Header />
            <Table data={data} />
        </div>
    );
}

export default Scoreboard;
