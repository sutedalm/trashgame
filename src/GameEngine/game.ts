import { Player } from "./Entities/player";
import { Entity } from "./Entities/entity";
import { Controller } from "./controller";
import { Display } from "./display";
import { Rectangle } from "./Entities/rectangle";
import { Tile } from "./Entities/tile";
import { TrashItem } from "./Entities/trash-item";
import { Scoreboard } from "./Entities/scoreboard";

export class Game {
    // "entities" gets rendered on a layer under "gui"
    private entities: Entity[] = [];
    private tiles: Tile[] = [];
    private gui: Entity[] = [];

    /* Background - temp */
    private color = "rgba(255,255,255)";
    private colorOpp = "rgb(0,0,0)";
    private colorOppGray = "rgb(0,0,0)";
    private colors = [255, 255, 255];
    private shifts = [1, 1, 1];

    private lastUpdate = 0;

    private player = new Player(0, 0, this);
    private scoreboard = new Scoreboard(this);
    public currentWidth = 0;
    public currentHeight = 0;

    public cameraCanvasWidth: number;
    public cameraCanvasHeight: number;

    constructor(display: Display) {
        this.currentWidth = display.context.canvas.width;
        this.currentHeight = display.context.canvas.height;

        this.cameraCanvasWidth = display.cameraCanvasWidth;
        this.cameraCanvasHeight = display.cameraCanvasHeight;

        this.initAssets();
    }

    initAssets() {
        this.initGUI();
        this.addEntity(TrashItem.createRandom(this));
    }

    initGUI() {
        const width = this.currentWidth;
        const height = this.currentHeight;
        const lineWidth = 4;

        this.gui = [];
        this.tiles = [];

        // Init the Tiles for the 3 zones
        this.tiles.push(new Tile(0, 0, width * 0.3333, height, "#00FFFF25"));
        this.tiles.push(new Tile(width * 0.3333, 0, width * 0.3333, height, "#FF00FF25"));
        this.tiles.push(new Tile(width * 0.6666, 0, width * 0.3333, height, "#ff950025"));

        // Init all the two lines delimiting the 3 zones
        this.gui.push(new Rectangle(width * 0.3333, 0, lineWidth, height, "#555555"));
        this.gui.push(new Rectangle(width * 0.6666, 0, lineWidth, height, "#555555"));
        this.gui.push(this.scoreboard);
    }

    update(time_stamp: number) {
        let dt = time_stamp - this.lastUpdate;
        if (dt === 0) return;

        this.lastUpdate = time_stamp;

        //Update the player
        this.player.update(dt);

        // Update all the entities
        for (let entity of this.entities) {
            entity.update(dt);
        }

        // GUI Stuff does not (at least currently) need to be updated)

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

        for (let tile of this.tiles) {
            tile.render(display);
        }

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
            //TODO: Spawn trash items on pressing enter ?
        }
    }

    resizeEvent(display: Display) {
        this.currentWidth = display.context.canvas.width;
        this.currentHeight = display.context.canvas.height;

        this.cameraCanvasHeight = display.cameraCanvasHeight;
        this.cameraCanvasWidth = display.cameraCanvasWidth;

        // Update the GUI to the new size
        this.initGUI();
    }

    getEntityByUUId(uuid: string): Entity | undefined {
        let entity = this.entities.find((value) => value.id === uuid);
        if (entity) {
            return entity;
        }

        return this.gui.find((value) => value.id === uuid);
    }

    getTileByPos(x: number): Tile {
        if (x < this.currentWidth * 0.333) {
            return this.tiles[0];
        } else if (x < this.currentWidth * 0.666) {
            return this.tiles[1];
        } else {
            return this.tiles[2];
        }
    }

    addEntity(e: Entity) {
        this.entities.push(e);
    }

    addPoints(p: number) {
        this.scoreboard.score += p;
    }

    subtractLife() {
        this.scoreboard.lifes -= 1;
        if (this.scoreboard.lifes === 0) {
            //TODO game over
        }
    }

    removeEntity(uuid: string) {
        let i = this.entities.findIndex((value) => value.id === uuid);
        if (i > -1) {
            this.entities.splice(i, 1);
        } else {
            let i = this.gui.findIndex((value) => value.id === uuid);
            if (i > -1) this.gui.splice(i, 1);
        }
    }
}
