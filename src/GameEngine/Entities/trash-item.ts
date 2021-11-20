import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";
import { Game } from "../game";

export class TrashItem implements Entity {
    private static categories = ["bio", "gelbersack", "restmuell"];
    private static names = [
        ["apple", "drip", "green-tea", "orange", "tea"],
        ["can", "food-container", "milk", "shopping-bag", "takeaway-cups", "toothpaste"],
        ["cigarette", "diapers", "gallery", "light-bulb", "pen", "poop", "porcelain"],
    ];

    x = 0;
    y = 0;
    width = 64;
    height = 64;
    id = uuid();
    name: string;
    category: number;
    game: Game;
    active = true;

    // Either tile 1 2 or 3
    private selectedTile = 2;
    private elapsedTime = 0;

    constructor(x: number, y: number, category: number, name: string, game: Game) {
        this.x = x;
        this.y = y;
        this.category = category;
        this.name = name;
        this.game = game;
    }

    render(display: Display): void {
        display.drawImage(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height,
            TrashItem.categories[this.category] + "/" + this.name + ".png"
        );
    }

    update(dt: number): void {
        this.elapsedTime += dt;

        if (this.active) {
            const convertRelativePos = (relPos: number, absLength: number) => relPos * absLength;
            const handsfreeX = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.x;
            const convertedX =
                convertRelativePos(1 - handsfreeX, this.game.cameraCanvasWidth) || this.x;

            let newSelectedTile;
            if (convertedX < this.game.currentWidth * 0.333) {
                newSelectedTile = 1;
            } else if (convertedX < this.game.currentWidth * 0.666) {
                newSelectedTile = 2;
            } else {
                newSelectedTile = 3;
            }

            if (this.selectedTile !== newSelectedTile) {
                // Tile changed since last time

                // Transition between the tiles
                this.selectedTile = newSelectedTile;
            } else {
                // Tile the same as before
                this.x = this.game.currentWidth * (0.333 * this.selectedTile - 0.166);

                // "Leaf swing" animation
                this.x += Math.sin(this.elapsedTime * 0.002) * 50;
            }

            this.y += 0.1 * dt; //TODO: Adapt the speed depending on height, so that it takes same amount of time

            // If the user didn't squat before end of the game
            if (this.y + this.height / 2 >= this.game.cameraCanvasHeight) {
                this.game.subtractLife();
                this.active = false;
                this.game.removeEntity(this.id);
            }
        }
    }

    static createRandom(game: Game) {
        let x = Math.floor(Math.random() * game.cameraCanvasWidth);
        let cat = Math.floor(Math.random() * 3);
        return new TrashItem(
            x,
            0,
            cat,
            TrashItem.names[cat][Math.floor(Math.random() * TrashItem.names[cat].length)],
            game
        );
    }

    static getImagesToLoad() {
        let paths = [];
        for (let i = 0; i < this.categories.length; i++) {
            for (let j = 0; j < this.names[i].length; j++) {
                paths.push(this.categories[i] + "/" + this.names[i][j] + ".png");
            }
        }
        return paths;
    }
}
