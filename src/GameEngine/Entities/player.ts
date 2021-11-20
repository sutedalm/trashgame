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
    velocity = { x: 0, y: 0 };
    drag = 0.9;
    readonly SPEED = 500;

    isJumping = false;
    justJumped = false;
    jumpTime = 0;
    sizeRatio = 1;

    currentTile: Tile | undefined;

    constructor(x: number, y: number, game: Game) {
        this.x = x;
        this.y = y;
        this.game = game;
    }

    update(dt: number) {
        // MOVING LEFT AND RIGHT
        if (this.velocity.x !== 0) {
            this.x += this.velocity.x * (1.0 / dt);
            this.velocity.x *= this.drag;
        }

        // MOVING UP AND DOWN
        if (this.velocity.y !== 0) this.y += this.velocity.y * (1.0 / dt);
        this.velocity.y *= this.drag;

        // JUMPING
        if (this.isJumping && this.jumpTime <= 1000) {
            this.jumpTime += dt;

            let oldSizeRatio = this.sizeRatio;
            this.sizeRatio = -(Math.pow(this.jumpTime - 500, 2) * 0.000002) + 1.5;
            let newSize = 64 * this.sizeRatio;
            this.width = newSize;
            this.height = newSize;

            let positionAdjust = (this.sizeRatio - oldSizeRatio) * 32;
            this.x -= Math.round(positionAdjust);
            this.y -= Math.round(positionAdjust);
        } else {
            this.isJumping = false;
            this.jumpTime = 0;
            this.width = 64;
            this.height = 64;
        }

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
        // if (controller.up.status && !controller.down.status) {
        //     //Go down
        //     this.velocity.y = -this.SPEED;
        // } else if (controller.down.status && !controller.up.status) {
        //     //Go up
        //     this.velocity.y = this.SPEED;
        // }

        if (controller.left.status && !controller.right.status) {
            //Go left
            this.velocity.x = -this.SPEED;
        } else if (controller.right.status && !controller.left.status) {
            //Go right
            this.velocity.x = this.SPEED;
        }

        if (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) >= this.SPEED * 2) {
            this.velocity.x *= 0.75;
            this.velocity.y *= 0.75;
        }

        if (controller.space.status && !this.isJumping && !this.justJumped) {
            this.isJumping = true;
            this.justJumped = true;
        }

        if (!controller.space.status) {
            this.justJumped = false;
        }
    }
}
