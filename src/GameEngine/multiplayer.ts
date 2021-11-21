
import { useState } from "react";
import socketIOClient from "socket.io-client";
import { Game } from "./game";
import { getPlayerPostionData, PlayerPostionData } from "./handsfreeController";

const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";
// const ENDPOINT = "http://localhost:8080";

const socket = socketIOClient(ENDPOINT);

export function useMultiplayerId() {
    const [id, setId] = useState(socket.id);

    socket.on("connect", () => {
        setId(socket.id);
    });

    return id;
}

export class MultiplayerController {
    private multiplayerData: {
        player: PlayerPostionData;
        trash_items: any[];
    };
    private game: Game;
    constructor(game: Game) {
      this.game = game;
        // this format has to be same as in game.ts (requestBody)
        this.multiplayerData = {
            player: getPlayerPostionData(),
            trash_items: [],
        };

        socket.on("game update", (body) => {
            this.multiplayerData = body;
            game.updateMultiplayerTrashItems(body.trash_items);
        });
    }

    public getMultiplayerData = () => {
        return this.multiplayerData;
    };
}

export default socket;
