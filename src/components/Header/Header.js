import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="headerContainer">
            <Link to="/" className="headerHome">
                <span>Home</span>
            </Link>
            <span className="headerTeamName">Team Fitlez</span>
        </div>
    );
}

export default Header;
