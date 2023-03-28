import "./MessageBubble.css";

const MessageBubble = ({content, fromUser}) => {
    return (
        <div className={`message-bubble ${fromUser ? "sent" : "received"}`}>
            {content}
        </div>
    );
};

export default MessageBubble;