import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "handsfree/build/lib/assets/handsfree.css";
import Handsfree from "handsfree";
import MainPage from "./MainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameEngineComponent } from "./GameEngine/GameEngineComponent";

window.handsfree = new Handsfree({ pose: true, showDebug: true });
window.handsfree.enablePlugins("browser");
window.handsfree.start();

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <MainPage />
        </React.StrictMode>
        <Routes>
            {/* <Route exact path="/" element={<MainPage />} /> */}
            <Route exact path="/game" element={<GameEngineComponent />} />
        </Routes>
    </Router>,
    document.getElementById("root")
);
