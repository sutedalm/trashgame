import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="headerContainer">
            <div className="headerNav">
                <Link to="/" className="headerHome">
                    <span>Home</span>
                </Link>
                <Link to="/scoreboard" className="headerHome">
                    <span>Scoreboard</span>
                </Link>
            </div>
            <span className="headerTeamName">Team Fitlez</span>
        </div>
    );
}

export default Header;
