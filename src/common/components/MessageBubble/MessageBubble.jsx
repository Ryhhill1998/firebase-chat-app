import "./MessageBubble.css";
import UserIcon from "../UserIcon/UserIcon";

const MessageBubble = ({id, content, fromUser, lastMessage, read, handler}) => {
    return (
        <div className={`message-bubble-container ${fromUser ? "sent" : "received"}`}>
            <div>
                {!fromUser && <UserIcon size="small"/>}
                <div className="message-bubble" onClick={() => handler(id)}>
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