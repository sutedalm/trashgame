import "./MainPage.css";
import { Link } from "react-router-dom";
import FlyingApple from "./flyingIcons/FlyingApple";
import FlyingCan from "./flyingIcons/FlyingCan";
import CopyClipboardButton from "../components/CopyClipboardButton/CopyClipboardButton";

function MainPage() {
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
                    <h5 className="leftBodySubHeader">Try it out, now!</h5>
                    <div className="rightBodyButtons">
                        <CopyClipboardButton />
                        <button class="button">
                            <span>JOIN A GAME</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
