import "./MessagePreview.css";
import UserIcon from "../UserIcon/UserIcon";

const MessagePreview = ({id, content, name, fromUser, handleClick}) => {
    
    const contentWidth = window.innerWidth >= 500 ? "300px" : 0.6 * window.innerWidth + "px";

    return (
        <div className="message-preview" onClick={() => handleClick(id)}>
            <UserIcon size="large"/>
            <div className="content">
                <h3>{name}</h3>
                <p style={{width: contentWidth}}>{(fromUser ? "You: " : "") + content}</p>
            </div>
        </div>
    );
};

export default MessagePreview;