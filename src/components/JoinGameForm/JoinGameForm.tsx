import React from "react";
import "./JoinGameForm.scss";
const JoinGameForm = (props: { serverId: string; setServerId: Function }) => {
    const handleChange = (event: any) => {
        props.setServerId(event.target.value);
    };
    return (
        <div className="JoinGameForm__container">
            <input
                type="text"
                placeholder="SERVER CODE"
                value={props.serverId}
                onChange={handleChange}
            />
            <button className="button">
                <span>JOIN A GAME</span>
            </button>
        </div>
    );
};

export default JoinGameForm;
