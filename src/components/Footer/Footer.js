import "./Footer.css";

function MainPage({ serverId, setServerId }) {
    return (
        <div className="footerContainer">
            <div>
                <h2>About</h2>
                <h5>
                    We created a fun AR exercising game, where people can learn more about correct
                    waste sorting while having fun and exercising their bodies, alone, or with their
                    friends.
                </h5>
            </div>
            <div>
                <h2>How to play</h2>
                <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                </ul>
            </div>
        </div>
    );
}

export default MainPage;
