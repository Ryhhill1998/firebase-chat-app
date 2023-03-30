import "./MessagePreview.css";
import UserIcon from "../UserIcon/UserIcon";

const MessagePreview = ({id, content, name, fromUser, unread, handleClick}) => {

    console.log(unread)
    
    const contentWidth = window.innerWidth >= 500 ? "300px" : 0.6 * window.innerWidth + "px";

    return (
        <div className={`message-preview ${unread ? "unread" : ""}`} onClick={() => handleClick(id, unread)}>
            <UserIcon size="large"/>
            <div className="content">
                <h3>{name}</h3>
                <p style={{width: contentWidth}}>{(fromUser ? "You: " : "") + content}</p>
            </div>
        </div>
    );
};

export default MessagePreview;