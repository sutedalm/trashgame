import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Tile } from "./tile";
import { Game } from "../game";
import { EventManager } from "../Events/eventManager";
import { EntityEnterTileEvent } from "../Events/entityEnterTileEvent";
import { EntityLeaveTileEvent } from "../Events/entityLeaveTileEvent";

export class Player implements Entity {
    x: number;
    y: number;
    id = uuid();

    game: Game;
    width = 64;
    height = 64;
    currentTile: Tile | undefined;

    constructor(x: number, y: number, game: Game) {
        this.x = x;
        this.y = y;
        this.game = game;
    }

    update(dt: number) {
        const convertRelativePos = (relPos: number, absLength: number, offset: number) =>
            (relPos * absLength - offset);
        const handsfreeX = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.x;
        const handsfreeY = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.y;
        this.x = convertRelativePos(handsfreeX, this.game.cameraCanvasWidth, this.width/2) || this.x
        this.y = convertRelativePos(handsfreeY, this.game.cameraCanvasHeight, this.height/2) || this.y

        // Get the current tile
        let oldTile = this.currentTile;
        this.currentTile = this.game.getTileByPos(this.x);
        if (oldTile !== this.currentTile) {
            if (oldTile) {
                EventManager.OnEntityLeaveTileEvent(new EntityLeaveTileEvent(oldTile, this));
            }
            EventManager.OnEntityEnterTileEvent(new EntityEnterTileEvent(this.currentTile, this));
        }
    }

    render(display: Display) {
        //Render the player to the screen
        display.drawRectangle(this.x, this.y, this.width, this.height, "#FF0000");
    }

    handleInput(controller: Controller) {
    }
}
