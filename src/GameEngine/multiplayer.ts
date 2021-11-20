
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";

const multiplayer = socketIOClient(ENDPOINT);

export default multiplayer;

// socket.on("chat message", function (msg) {
//   console.log("received: ", msg);
// });


// const handleClick = (e) => {
//   socket.emit("chat message", "Hello!");
//   console.log("send: ", "Hello!");
// };
