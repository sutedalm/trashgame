import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "handsfree/build/lib/assets/handsfree.css";
import App from "./App";
import Handsfree from "handsfree";

window.handsfree = new Handsfree({ pose: true, showDebug: true });
window.handsfree.enablePlugins("browser");
window.handsfree.start();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
