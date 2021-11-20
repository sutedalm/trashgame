import { Player } from "./Entities/player";
import { Entity } from "./Entities/entity";
import { Controller } from "./controller";
import { Display } from "./display";
import { Rectangle } from "./Entities/rectangle";

export class Game {
    // "entities" gets rendered on a layer under "gui"
    entities: Entity[] = [];
    gui: Entity[] = [];

    /* Background - temp */
    color = "rgb(255,255,255)";
    colorOpp = "rgb(0,0,0)";
    colorOppGray = "rgb(0,0,0)";
    colors = [255, 255, 255];
    shifts = [1, 1, 1];

    lastUpdate = 0;

    player = new Player(0, 0);

    constructor(display: Display) {
        this.initAssets(display);
    }

    initAssets(display: Display) {
        this.initGUI(display);
    }

    initGUI(display: Display) {
        const width = display.context.canvas.width;
        const height = display.context.canvas.height;
        const lineWidth = 4;

        // Init all the two lines delimiting the zones
        this.gui.push(
            new Rectangle(width * 0.3333 + lineWidth / 2, 0, lineWidth, height, "#555555")
        );
        this.gui.push(
            new Rectangle(width * 0.6666 + lineWidth / 2, 0, lineWidth, height, "#555555")
        );
    }

    update(time_stamp: number) {
        let dt = time_stamp - this.lastUpdate;
        if (dt === 0) return;

        this.lastUpdate = time_stamp;

        //Update the player
        this.player.update(dt);

        for (var i = 0; i < 3; i++) {
            let color = this.colors[i];
            let shift = this.shifts[i];

            if (color + shift > 255 || color + shift < 0) {
                shift = shift < 0 ? Math.random() * 2 + 1 : Math.random() * 2 - 2;
            }

            color += shift;
            this.colors[i] = Math.floor(color);
            this.shifts[i] = shift;
        }
        this.color = "rgb(" + this.colors[0] + "," + this.colors[1] + "," + this.colors[2] + ")";
        this.colorOpp =
            "rgb(" +
            (255 - this.colors[0]) +
            "," +
            (255 - this.colors[1]) +
            "," +
            (255 - this.colors[2]) +
            ")";
        let minOppColor = 255 - Math.max(Math.max(this.colors[0], this.colors[1]), this.colors[2]);
        this.colorOppGray = "rgb(" + minOppColor + "," + minOppColor + "," + minOppColor + ")";
    }

    render(display: Display) {
        //For every object to render

        this.player.render(display);

        for (let entity of this.entities) {
            entity.render(display);
        }

        for (let gui of this.gui) {
            gui.render(display);
        }
    }

    handleInput(controller: Controller) {
        this.player.handleInput(controller);

        if (controller.enter.status) {
            //TODO: Spawn trash items
            console.log(controller.enter.status);
        }
    }

    resizeEvent(display: Display) {
        // Update the GUI to the new size
        this.gui = [];
        this.initGUI(display);
    }
}
