import { Display } from "../display";
import { Rectangle } from "./rectangle";

/**
 * Tile is a rectangle which only appears when a player is inside
 */
export class Tile extends Rectangle {
    containsPlayer = false;

    render(display: Display) {
        // Only display the rectangle if the player is on it
        if (this.containsPlayer) {
            display.drawRectangle(this.x, this.y, this.width, this.height, this.color);
        }
    }
}
