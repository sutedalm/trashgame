import "./MainPage.css";
import { Link } from "react-router-dom";
import FlyingApple from "./flyingIcons/FlyingApple";
import CopyClipboardButton from "../components/CopyClipboardButton/CopyClipboardButton";
import JoinGameForm from "../components/JoinGameForm/JoinGameForm";
import { useNavigate } from "react-router-dom";
import socket from "./../GameEngine/multiplayer";

function MainPage({ serverId, setServerId }) {
    const navigate = useNavigate();

    socket.on("start game", function (serverId) {
        console.log("start game", serverId);
        setServerId(serverId);

        navigate("/multiplayer");
    });
    return (
        <div className="mainPageContainer">
            <div className="flier">
                <FlyingApple />
            </div>
            <div className="mainPageHeader">
                <span className="mainPageHeaderName">Team Fitlez</span>
            </div>
            <div className="mainPageBody">
                <div className="leftBody">
                    <h2 className="leftBodyHeader">Singleplayer</h2>
                    <h5 className="leftBodySubHeader">Try it out, now!</h5>
                    <Link to="/game" className="button">
                        <span>START A GAME</span>
                    </Link>
                </div>
                <div class="rightBody">
                    <h2 className="leftBodyHeader">Multiplayer</h2>
                    <h5 className="leftBodySubHeader">Send the server code to a friend!</h5>
                    <div className="rightBodyButtons">
                        <CopyClipboardButton />
                        <JoinGameForm serverId={serverId} setServerId={setServerId} />
                    </div>
                </div>
            </div>
            <Link to="/scoreboard" className="button">
                <span>SCOREBOARD</span>
            </Link>
        </div>
    );
}

export default MainPage;
