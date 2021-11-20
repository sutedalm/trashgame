export class ControllerInput {
    constructor() {
        this.status = false;
    }

    trigger(status) {
        this.status = status;
    }
}
