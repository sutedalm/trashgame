import { Player } from "./Entities/player";
import { Entity } from "./Entities/entity";
import { Controller } from "./controller";
import { Display } from "./display";
import { Rectangle } from "./Entities/rectangle";
import { Tile } from "./Entities/tile";
import { TrashItem } from "./Entities/trash-item";
import { Scoreboard } from "./Entities/scoreboard";
import socket, { MultiplayerController } from "./multiplayer";
import { Player2 } from "./Entities/player2";
import { GameEventController } from "./Events/gameEventController";
import { getPlayerPostionData } from "./handsfreeController";
import { BlinkingRectangle } from "./Entities/blinkingRectangle";

export class Game {
    // "entities" gets rendered on a layer under "gui"
    public entities: Entity[] = [];
    private tiles: Tile[] = [];
    private gui: Entity[] = [];
    public blinkingRect!: BlinkingRectangle;

    private lastUpdate: number | undefined;

    private lastTimeItemSummonned: number | undefined;
    private summonDuration: number = 5000; // 5s between object summons

    private player = new Player(0, 0, this);
    private scoreboard = new Scoreboard(this);
    public currentWidth = 0;
    public currentHeight = 0;

    public cameraCanvasWidth: number;
    public cameraCanvasHeight: number;

    private serverId: string;
    public isGamePaused: boolean = false;
    public isGameOver: boolean = false;
    private multiplayerController = new MultiplayerController(this);

    private requested_item = { cat: -1, name: "" };

    public gameEvents: GameEventController;

    constructor(display: Display, serverId: string) {
        this.currentWidth = display.context.canvas.width;
        this.currentHeight = display.context.canvas.height;

        this.cameraCanvasWidth = display.cameraCanvasWidth;
        this.cameraCanvasHeight = display.cameraCanvasHeight;

        this.serverId = serverId;

        this.gameEvents = new GameEventController();

        this.initAssets();

        if (this.serverId) {
            this.addEntity(new Player2(this, this.multiplayerController));
        }
    }

    initAssets() {
        this.initGUI();
    }

    initGUI() {
        const width = this.currentWidth;
        const height = this.currentHeight;
        const lineWidth = 4;

        this.gui = [];
        this.tiles = [];

        // Init the Tiles for the 3 zones
        this.tiles.push(new Tile(0, 0, width * 0.3333, height, "#2727d925", 0));
        this.tiles.push(new Tile(width * 0.3333, 0, width * 0.3333, height, "#d9b12b25", 1));
        this.tiles.push(new Tile(width * 0.6666, 0, width * 0.3333, height, "#de7b2625", 2));

        // Init all the two lines delimiting the 3 zones
        this.gui.push(new Rectangle(width * 0.3333, 0, lineWidth, height, "#555555"));
        this.gui.push(new Rectangle(width * 0.6666, 0, lineWidth, height, "#555555"));
        this.blinkingRect = new BlinkingRectangle(0, 0, width, height, "#FF000025");
        this.gui.push(this.scoreboard);
    }

    update(time_stamp: number) {
        if (!this.lastUpdate) this.lastUpdate = time_stamp;

        let dt = time_stamp - this.lastUpdate;
        if (dt === 0) return;

        this.lastUpdate = time_stamp;

        //Update the player
        this.player.update(dt);

        if (!this.isGamePaused) {
            // Update all the entities
            for (let entity of this.entities) {
                entity.update(dt);
            }

            if (
                !this.lastTimeItemSummonned ||
                this.lastTimeItemSummonned + this.summonDuration < time_stamp
            ) {
                // Summon an item every x seconds
                this.lastTimeItemSummonned = time_stamp;

                this.entities.push(TrashItem.createRandom(this));
            }
        }

        this.blinkingRect.update(dt);

        // multiplayer
        const playerPositionData = getPlayerPostionData();
        let trash_items: any[] = [];
        for (let e of this.entities) {
            if (e instanceof TrashItem) {
                trash_items.push({
                    x: e.x,
                    y: e.y,
                    id: e.id,
                    category: e.category,
                    name: e.name,
                });
            }
        }

        const requestBody = {
            player: playerPositionData,
            trash_items: trash_items,
            new_item: this.requested_item,
        };
        // console.log("requestBody", requestBody);
        socket.emit("game update", this.serverId, requestBody);
        this.requested_item.cat = -1;
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

        this.blinkingRect.render(display);
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
        if (p !== 0) {
            this.gameEvents.onScorePoint.next(this.scoreboard.score);
        }
    }

    subtractLife() {
        this.scoreboard.lifes -= 1;
        this.blinkingRect.blink();

        if (this.scoreboard.lifes === 0) {
            this.onGameOver();
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

    getActiveTrashIcon() {
        let cur = null;
        for (let e of this.entities) {
            if (e instanceof TrashItem) {
                if (e.active && (cur == null || e.y > cur.y)) cur = e;
            }
        }
        return cur;
    }

    stop() {
        this.gameEvents.stop();
    }

    private onGameOver() {
        this.isGameOver = true;
        this.gameEvents.onGameOver.next(this.scoreboard.score);
        this.pause();
    }

    pause() {
        this.isGamePaused = true;
    }

    resume() {
        this.isGamePaused = false;
    }

    updateMultiplayerTrashItems(trash_items: any[]) {
        for (let item of trash_items) {
            let e = this.entities.find((value) => value.id === item.id) as TrashItem;
            if (e) {
                e.x = item.x;
                e.y = item.y;
            } else {
                e = new TrashItem(item.x, item.y, item.category, item.name, true, this);
                e.id = item.id;
                e.active = false;
                this.addEntity(e);
            }
        }
    }

    isMultiplayer() {
        return !!this.serverId;
    }

    requestNewTrashItemForEnemy(cat: number, name: string) {
        this.requested_item = { cat: cat, name: name };
    }
}
