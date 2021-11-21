import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Tile } from "./tile";
import { Game } from "../game";
import { EventManager } from "../Events/eventManager";
import { EntityEnterTileEvent } from "../Events/entityEnterTileEvent";
import { EntityLeaveTileEvent } from "../Events/entityLeaveTileEvent";
import { MultiplayerController } from "../multiplayer";

export class Player2 implements Entity {
    x: number;
    y: number;
    id = uuid();

    game: Game;
    multiplayerController: MultiplayerController;

    width = 64;
    height = 64;

    constructor(game: Game, multiplayerController: MultiplayerController) {
        const multiplayerPos = multiplayerController.getMultiplayerData().player;
        this.x = multiplayerPos.x;
        this.y = multiplayerPos.y;
        this.game = game;
        this.multiplayerController = multiplayerController;
    }

    update(dt: number) {
        const convertRelativePos = (relPos: number, absLength: number, offset: number) =>
            relPos * absLength - offset;

        const multiplayerPos = this.multiplayerController.getMultiplayerData()?.player;
        this.x =
            convertRelativePos(
                1 - multiplayerPos?.x,
                this.game.cameraCanvasWidth,
                this.width / 2
            ) || this.x;
        this.y =
            convertRelativePos(multiplayerPos?.y, this.game.cameraCanvasHeight, this.height / 2) ||
            this.y;
    }

    render(display: Display) {
        //Render the player to the screen
        display.drawRectangle(this.x, this.y, this.width, this.height, "#0000FF");
    }

    handleInput(controller: Controller) {}
}
