import { Controller } from "./controller";
import { Display } from "./display";
import { Game } from "./game";
import { Engine } from "./engine";

export class TrashGame {
    constructor() {
        /* Controller handles user input */
        this.controller = new Controller();
        /* Display handles window resizing */
        this.display = new Display(document.querySelector("canvas"));
        /* Display handles the game logic */
        this.game = new Game();

        let fps = 30;
        /* Engine combines the controller, display and game */
        this.engine = new Engine(
            1000 / fps,
            this.renderGame.bind(this),
            this.updateGame.bind(this)
        );

        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));

        this.resize();
        this.engine.start();
    }

    // Gets called before render, updates things like position of entities
    updateGame(time_stamp) {
        if (this.game === undefined) {
            return;
        }

        this.game.update(time_stamp);
        this.game.handleInput(this.controller);
    }

    // Renders the entities etc at their position
    renderGame(time_stamp) {
        if (this.game === undefined) {
            return;
        }

        this.display.fill(this.game.color);

        //For every object to render
        this.game.player.render(this.display);

        this.display.render();
    }

    resize(event) {
        //the events default action should not be taken as it normally would be
        if (event) event.preventDefault();

        let height, width;

        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;

        this.display.resize(width, height);
    }

    keyDown(event) {
        // event.preventDefault()

        switch (event.keyCode) {
            case 90:
                this.controller.up.trigger(true);
                break;
            case 81:
                this.controller.left.trigger(true);
                break;
            case 68:
                this.controller.right.trigger(true);
                break;
            case 83:
                this.controller.down.trigger(true);
                break;
            case 32:
                this.controller.space.trigger(true);
                break;
        }
    }

    keyUp(event) {
        // event.preventDefault()

        switch (event.keyCode) {
            case 90:
                this.controller.up.trigger(false);
                break;
            case 81:
                this.controller.left.trigger(false);
                break;
            case 68:
                this.controller.right.trigger(false);
                break;
            case 83:
                this.controller.down.trigger(false);
                break;
            case 32:
                this.controller.space.trigger(false);
                break;
        }
    }
}
