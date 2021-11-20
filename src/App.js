import "./App.scss";

import MainPage from "./MainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameEngineComponent } from "./GameEngine/GameEngineComponent";
import { useState } from "react";

function App() {
    const [serverId, setServerId] = useState(undefined);
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<MainPage serverId={serverId} setServerId={setServerId} />}
                />
                <Route exact path="/game" element={<GameEngineComponent />} />
                <Route
                    exact
                    path="/multiplayer"
                    element={<GameEngineComponent serverId={serverId} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
