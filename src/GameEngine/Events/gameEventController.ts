import { Subject } from "rxjs";

export class GameEventController {
    constructor() {}

    stop() {
        this.onGameOver.complete();
    }

    /// Returns score on game over
    public onGameOver = new Subject<number>();
}
