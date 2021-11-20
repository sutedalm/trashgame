import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "handsfree/build/lib/assets/handsfree.css";
import Handsfree from "handsfree";
import App from "./App";

window.handsfree = new Handsfree({ pose: true, showDebug: true });
window.handsfree.enablePlugins("browser");
window.handsfree.start(() => {
    window.handsfree.pause();
});
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
