import multiplayer from "../../GameEngine/multiplayer";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clipboardIcon from "./icons8-kopieren-24.png";

import "./CopyClipboardButton.scss";

const CopyClipboardButton = () => {
    const [gameRoomId, setGameRoomId] = useState(multiplayer.id);
    useEffect(() => {
        setGameRoomId(multiplayer.id);
    }, [multiplayer.id]);

    const [copied, setCopied] = useState(false);

    const [gameRoomIdCopied, setGameRoomIdCopied] = useState(false);
    return (
        <div className="CopyClipboardButon__container">
            {gameRoomId && (
                <CopyToClipboard text={gameRoomId} onCopy={() => setCopied(true)}>
                    <button className="CopyClipboardButon__button">
                        <span>{gameRoomId}</span>
                        <img src={clipboardIcon} alt="copy" />
                    </button>
                </CopyToClipboard>
            )}
            {copied && <span>Copied!</span>}
        </div>
    );
};

export default CopyClipboardButton;
