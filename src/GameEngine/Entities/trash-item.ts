import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";

export class TrashItem implements Entity {
    x = 0;
    y = 0;
    id = uuid();
    item_name = "bio/apple.png";

    constructor(x : number, y : number) {
        this.x = x
        this.y = y
    }

    render(display: Display): void {
        display.drawImage(this.x, this.y, 64, 64, this.item_name);
    }

    update(dt: number): void {}
}
