import "./GameOverPopUp.scss";
import React, { Component } from "react";

interface IProps {
    score: number;
}

interface IState {
    username: string;
}

export class GameOverPopUp extends Component<IProps, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            username: "",
        };
    }

    onSubmit(score: number, username: string) {
        console.log("score", score);
        console.log("username", username);
        const linkSuffix = `update_score?user=${username}&score=${score}`;
    }

    updateInputValue(evt: any) {
        this.setState({
            username: evt.target.value,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="gameover">
                    <h2>Game Over</h2>
                    <p>You got a score of {this.props.score}!</p>
                    <input
                        type="text"
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={(evt) => this.updateInputValue(evt)}
                    />
                    <button
                        className="scoreSubmitButton"
                        onClick={(event) => this.onSubmit(this.props.score, this.state.username)}
                    >
                        Submit to Scoreboard!
                    </button>
                </div>
            </div>
        );
    }
}
