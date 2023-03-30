import "./NewMessageInput.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {createNewMessage} from "../../../utils/firebase";
import {useParams} from "react-router-dom";

const NewMessageInput = ({userId, otherUserId}) => {

    const {id: chatId} = useParams();

    const [messageContent, setMessageContent] = useState("");

    const handleChange = ({target}) => {
        const {value} = target;
        setMessageContent(value);
    };

    const handleSendClick = async () => {
        if (!messageContent) return;
        await createNewMessage(chatId, userId, otherUserId, messageContent);
        setMessageContent("");
    };

    const handleKeyDown = async ({key}) => {
        if (key !== "Enter") return;
        await handleSendClick();
    };

    return (
        <div className="new-message-input">
            <input
                type="text"
                name="messageContent"
                value={messageContent}
                onChange={handleChange}
                placeholder="Write a message"
                autoComplete="off"
                onKeyDown={handleKeyDown}
            />

            <button onClick={handleSendClick}>
                <FontAwesomeIcon className="icon" icon={faPaperPlane}/>
            </button>
        </div>
    );
};

export default NewMessageInput;