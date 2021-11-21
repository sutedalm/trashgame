import { useState } from "react";
import socketIOClient from "socket.io-client";
import { Game } from "./game";

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
        player: {
            x: number;
            y: number;
        };
        trash_items: any[];
    };
    private game: Game;
    constructor(game: Game) {
        this.game = game;
        // this format has to be same as in game.ts (requestBody)
        this.multiplayerData = {
            player: {
                x: 0,
                y: 0,
            },
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
