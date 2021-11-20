import "./GameOverPopUp.scss";
import React, { Component } from "react";

interface IProps {
    score: number;
}

interface IState {}

export class GameOverPopUp extends Component<IProps, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="gameover">
                    <h2>Game Over</h2>
                    <p>You got a score of {this.props.score}!</p>
                    <input type="text" placeholder="Your username" />
                </div>
            </div>
        );
    }
}
