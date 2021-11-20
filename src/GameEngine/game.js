import { Player } from "./Entities/player";

export class Game {
    constructor() {
        this.color = "rgb(255,255,255)";
        this.colorOpp = "rgb(0,0,0)";
        this.colorOppGray = "rgb(0,0,0)";

        this.colors = [255, 255, 255];
        this.shifts = [1, 1, 1];
        this.lastUpdate = 0;

        this.player = new Player(0, 0);
    }

    update(time_stamp) {
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

    handleInput(controller) {
        this.player.handleInput(controller);
    }
}
