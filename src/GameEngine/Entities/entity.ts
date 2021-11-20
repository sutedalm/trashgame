import { Display } from "../display";

export interface Entity {
    x: number;
    y: number;

    update(dt: number): void;
    render(display: Display): void;
}
