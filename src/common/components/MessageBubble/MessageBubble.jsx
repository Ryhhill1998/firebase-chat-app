import "./MessageBubble.css";

const MessageBubble = ({id, content, fromUser, handler}) => {
    return (
        <div className={`message-bubble ${fromUser ? "sent" : "received"}`} onClick={() => handler(id)}>
            {content}
        </div>
    );
};

export default MessageBubble;