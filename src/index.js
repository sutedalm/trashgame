import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "handsfree/build/lib/assets/handsfree.css";
import Handsfree from "handsfree";
import MainPage from "./MainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameEngineComponent } from "./GameEngine/GameEngineComponent";
import Scoreboard from "./Scoreboard/Scoreboard";

window.handsfree = new Handsfree({ pose: true, showDebug: true });
window.handsfree.enablePlugins("browser");
window.handsfree.start();

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/game" element={<GameEngineComponent />} />
                <Route exact path="/scoreboard" element={<Scoreboard />} />
            </Routes>
        </React.StrictMode>
    </Router>,
    document.getElementById("root")
);
