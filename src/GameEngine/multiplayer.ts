
import { useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";
// const ENDPOINT = "http://localhost:8080";


const socket = socketIOClient(ENDPOINT);

export function useMultiplayerId() {
  const [id, setId] = useState(socket.id)

  socket.on("connect", () => { setId(socket.id) });


  return id
}



export default socket;
