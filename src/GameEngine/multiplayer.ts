
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

export class MultiplayerController {
  private multiplayerData: {
    player: {
      x: number,
      y: number,
    }
  }
  constructor() {
    // this format has to be same as in game.ts (requestBody)
    this.multiplayerData = {
      player: {
        x: 0,
        y: 0,
      }
    };

    socket.on("game update", (body) => {this.multiplayerData = body;});
  }

  public getMultiplayerData = () => {
    return this.multiplayerData;
  }
}


export default socket;
