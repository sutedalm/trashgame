import { Entity } from "./entity";
import { v4 as uuid } from "uuid";
import { Display } from "../display";
import { Game } from "../game";

export class Scoreboard implements Entity {
    x = 0;
    y = 0;
    id = uuid();
    score = 0;
    lifes = 3;
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    render(display: Display): void {
        display.drawText(10, 40, "score: " + this.score, "30px Arial", "black", false);
        for (let i = 0; i < this.lifes; i++) {
            display.drawImage(10 + 42 * i, 80, 32, 32, "heart.png");
        }
        if (this.lifes == 0) {
            display.drawText(
                this.game.cameraCanvasWidth / 2,
                this.game.cameraCanvasHeight / 2,
                "score: " + this.score,
                "30px Arial",
                "black",
                false
            );
        }
    }

    update(dt: number): void {}
}
