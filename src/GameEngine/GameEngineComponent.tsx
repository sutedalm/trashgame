import "./GameEngineComponent.scss";
import { Component } from "react";
import { TrashGame } from "./trash-game";

interface IProps {}

interface IState {
    bottomHeight: string;
}

export class GameEngineComponent extends Component<IProps, IState> {
    game: TrashGame | undefined;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            bottomHeight: "60px",
        };
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
            </div>
        );
    }

    componentDidMount() {
        this.game = new TrashGame();
        (window as any).handsfree.unpause();

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
