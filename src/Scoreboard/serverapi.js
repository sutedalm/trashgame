export function getDataFromDatabase() {
    fetch("http://localhost:8080/database")
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            console.log("response data", data);
        });
}
