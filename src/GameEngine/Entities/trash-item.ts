import { Entity } from "./entity";
import { Display } from "../display";

export class TrashItem implements Entity {
    x = 0;
    y = 0;

    render(display: Display): void {}

    update(dt: number): void {}
}
