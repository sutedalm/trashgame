import "./GameEngineComponent.scss";
import React, { Component } from "react";
import { TrashGame } from "./trash-game";
import { GameOverPopUp } from "../components/GameOverPopUp/GameOverPopUp";

interface IProps {}

interface IState {
    bottomHeight: string;
    score: number | undefined;
}

export class GameEngineComponent extends Component<IProps, IState> {
    game: TrashGame | undefined;
    serverId: string | undefined;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            bottomHeight: "60px",
            score: undefined,
        };
        this.serverId = props.serverId;
    }

    render() {
        return (
            <div>
                <canvas></canvas>
                <div className="frame">
                    <div className="sides"></div>
                    <div className="bottom" style={{ height: this.state.bottomHeight }}>
                        <div className="labels">
                            <p>Residual Waste</p>
                            <p>Yellow Bin</p>
                            <p>Organic Garbage</p>
                        </div>
                    </div>
                </div>
                {this.state.score !== undefined && <GameOverPopUp score={this.state.score} />}
            </div>
        );
    }

    componentDidMount() {
        this.game = new TrashGame(this.serverId);
        (window as any).handsfree.unpause();

        let gameEvents = this.game.game.gameEvents;
        gameEvents.onGameOver.subscribe((score) => {
            console.log(score);
            this.setState({
                score: score,
            });
        });

        window.addEventListener("resize", this.updateDimensions.bind(this));
        this.updateDimensions();
    }

    updateDimensions() {
        if (!this.game) return;
        const height = this.game.display.cameraCanvasHeight;
        this.setState({
            bottomHeight: `calc(100vh - ${height}px + 5px)`,
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        this.game?.stop();
        delete this.game;
    }
}
