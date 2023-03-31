import "./MessageBubble.css";
import UserIcon from "../UserIcon/UserIcon";

const MessageBubble = ({content, fromUser, iconColour, lastMessage, read}) => {
    return (
        <div className={`message-bubble-container ${fromUser ? "sent" : "received"}`}>
            <div>
                {!fromUser && <UserIcon size="small" colour={iconColour}/>}
                <div className="message-bubble">
                    {content}
                </div>
            </div>

            {lastMessage && fromUser && (
                <p>{read ? "Read" : "Sent"}</p>
            )}
        </div>
    );
};

export default MessageBubble;