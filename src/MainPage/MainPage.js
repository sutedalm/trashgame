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
            <svg
                className="mainPageWabyPicture"
                id="svg"
                viewBox="0 0 1440 600"
                xmlns="http://www.w3.org/2000/svg"
                class="transition duration-300 ease-in-out delay-150"
            >
                <path
                    d="M 0,600 C 0,600 0,200 0,200 C 110.74641148325358,169.29186602870814 221.49282296650716,138.58373205741628 313,127 C 404.50717703349284,115.41626794258373 476.77511961722473,122.95693779904303 579,146 C 681.2248803827753,169.04306220095697 813.4066985645935,207.58851674641147 897,213 C 980.5933014354065,218.41148325358853 1015.5980861244018,190.68899521531102 1098,183 C 1180.4019138755982,175.31100478468898 1310.2009569377992,187.6555023923445 1440,200 C 1440,200 1440,600 1440,600 Z"
                    stroke="none"
                    stroke-width="0"
                    fill="#fcb90088"
                    class="transition-all duration-300 ease-in-out delay-150 path-0"
                ></path>
                <path
                    d="M 0,600 C 0,600 0,400 0,400 C 70.77511961722487,413.37799043062205 141.55023923444975,426.75598086124404 234,429 C 326.44976076555025,431.24401913875596 440.57416267942585,422.3540669856459 545,438 C 649.4258373205741,453.6459330143541 744.1531100478471,493.82775119617224 852,468 C 959.8468899521529,442.17224880382776 1080.8133971291866,350.3349282296651 1181,328 C 1281.1866028708134,305.6650717703349 1360.5933014354068,352.83253588516743 1440,400 C 1440,400 1440,600 1440,600 Z"
                    stroke="none"
                    stroke-width="0"
                    fill="#fcb900ff"
                    class="transition-all duration-300 ease-in-out delay-150 path-1"
                ></path>
            </svg>
        </div>
    );
}

export default MainPage;
