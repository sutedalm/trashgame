import "./GameEngineComponent.scss";
import { Component } from "react";
import { TrashGame } from "./trash-game";

export class GameEngineComponent extends Component {
    game: TrashGame | undefined;

    render() {
        return (
            <div>
                <canvas></canvas>
                <div className="frame">
                    <div className="sides"></div>
                    <div className="bottom"></div>
                    <div className="labels">
                        <p>Residual Waste</p>
                        <p>Yellow Bin</p>
                        <p>Organic Garbage</p>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.game = new TrashGame();
    }
}
