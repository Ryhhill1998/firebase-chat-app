import "./NewMessageInput.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const NewMessageInput = ({handleSend}) => {

    const [messageContent, setMessageContent] = useState("");

    const handleChange = ({target}) => {
        const {value} = target;
        setMessageContent(value);
    };

    const handleSendClick = () => {
        handleSend(messageContent);
        setMessageContent("");
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
            />

            <button onClick={handleSendClick}>
                <FontAwesomeIcon className="icon" icon={faPaperPlane}/>
            </button>
        </div>
    );
};

export default NewMessageInput;