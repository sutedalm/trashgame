import "./MainPage.css";
import { Link } from "react-router-dom";
import FlyingApple from "./flyingIcons/FlyingApple";
import FlyingCan from "./flyingIcons/FlyingCan";
import CopyClipboardButton from "../components/CopyClipboardButton/CopyClipboardButton";
import JoinGameForm from "../components/JoinGameForm/JoinGameForm";

function MainPage({ serverId, setServerId }) {
    return (
        <div className="mainPageContainer">
            <div className="flier">
                <FlyingApple />
            </div>
            {/* <div class="flier">
                <FlyingCan />
            </div> */}

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
        </div>
    );
}

export default MainPage;
