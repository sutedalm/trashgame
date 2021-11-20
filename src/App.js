import "./App.scss";

import MainPage from "./MainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameEngineComponent } from "./GameEngine/GameEngineComponent";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/game" element={<GameEngineComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
