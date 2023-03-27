import "./MessagePreview.css";
import UserIcon from "../UserIcon/UserIcon";

const MessagePreview = ({content, name, fromUser}) => {
    
    const contentWidth = window.innerWidth >= 500 ? "300px" : 0.6 * window.innerWidth + "px";

    console.log(window.innerWidth)

    return (
        <div className="message-preview">
            <UserIcon/>
            <div className="content">
                <h3>{name}</h3>
                <p style={{width: contentWidth}}>{(fromUser ? "You: " : "") + content}</p>
            </div>
        </div>
    );
};

export default MessagePreview;