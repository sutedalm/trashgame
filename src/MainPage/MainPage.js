import "./MainPage.css";
import { Link } from "react-router-dom";
import FlyingApple from "./flyingIcons/FlyingApple";
import CopyClipboardButton from "../components/CopyClipboardButton/CopyClipboardButton";
import JoinGameForm from "../components/JoinGameForm/JoinGameForm";
import { useNavigate } from "react-router-dom";
import socket from "./../GameEngine/multiplayer";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
            <Header />
            <div className="mainPageBody">
                <div className="leftBody">
                    <h2 className="leftBodyHeader">Singleplayer</h2>
                    <h5 className="leftBodySubHeader">Try it out, now!</h5>
                    <Link to="/game" className="button">
                        <span>START A GAME</span>
                    </Link>
                </div>
                <div className="rightBody">
                    <h2 className="leftBodyHeader">Multiplayer</h2>
                    <h5 className="leftBodySubHeader">Send the join code to a friend:</h5>
                    <div className="rightBodyButtons">
                        <CopyClipboardButton />
                        <JoinGameForm serverId={serverId} setServerId={setServerId} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
