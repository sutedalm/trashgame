
import { useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";


const socket = socketIOClient(ENDPOINT);

export function useMultiplayerId() {
  const [id, setId] = useState(socket.id)

  socket.on("connect", () => { setId(socket.id) });


  return id
}

export default socket;

// socket.on("chat message", function (msg) {
//   console.log("received: ", msg);
// });


// const handleClick = (e) => {
//   socket.emit("chat message", "Hello!");
//   console.log("send: ", "Hello!");
// };
