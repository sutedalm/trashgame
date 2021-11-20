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
        if (this.active) {
            const convertRelativePos = (relPos: number, absLength: number) => relPos * absLength;
            const handsfreeX = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.x;
            this.x = convertRelativePos(1 - handsfreeX, this.game.cameraCanvasWidth) || this.x;
            if (this.y + this.height / 2 >= this.game.cameraCanvasHeight) {
                this.game.subtractLife();
                this.active = false;
                this.game.removeEntity(this.id);
            } else {
                this.y += 1;
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
