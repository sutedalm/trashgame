import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";

export class TrashItem implements Entity {
    x = 0;
    y = 0;
    id = uuid();

    render(display: Display): void {}

    update(dt: number): void {}
}
