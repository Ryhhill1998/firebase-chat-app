import "./MessageBubble.css";
import UserIcon from "../UserIcon/UserIcon";

const MessageBubble = ({id, content, fromUser, handler}) => {
    return (
        <div className={`message-bubble-container ${fromUser ? "sent" : "received"}`}>
            {!fromUser && <UserIcon size="small"/>}
            <div className="message-bubble" onClick={() => handler(id)}>
                {content}
            </div>
        </div>
    );
};

export default MessageBubble;