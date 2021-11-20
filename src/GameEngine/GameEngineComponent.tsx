import { Component } from "react";
import { TrashGame } from "./trash-game";

export class GameEngineComponent extends Component {
    game: TrashGame | undefined;

    render() {
        return <canvas></canvas>;
    }

    componentDidMount() {
        this.game = new TrashGame();
        (window as any).handsfree.unpause();
    }
}
