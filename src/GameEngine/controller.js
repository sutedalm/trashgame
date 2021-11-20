import { ControllerInput } from "./controller-input";

export class Controller {
    constructor() {
        this.up = new ControllerInput();
        this.left = new ControllerInput();
        this.right = new ControllerInput();
        this.down = new ControllerInput();
        this.space = new ControllerInput();
    }
}
