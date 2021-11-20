import { Component } from "react";
import { TrashGame } from "./trash-game";

export class GameEngineComponent extends Component {
    render() {
        return <canvas></canvas>;
    }

    componentDidMount() {
        this.game = new TrashGame();
    }
}
