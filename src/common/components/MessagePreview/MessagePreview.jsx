import "./MessagePreview.css";
import UserIcon from "../UserIcon/UserIcon";
import {useNavigate} from "react-router-dom";
import {getChatId} from "../../../utils/firebase";

const MessagePreview = ({id, content, name, fromUser, iconColour, unread}) => {

    const navigate = useNavigate();

    const handleClick = async () => {
        navigate("/chats/" + id);
    };
    
    const contentWidth = window.innerWidth >= 500 ? "300px" : 0.6 * window.innerWidth + "px";

    return (
        <div className={`message-preview ${unread ? "unread" : ""}`} onClick={handleClick}>
            <UserIcon size="large" colour={iconColour}/>
            <div className="content">
                <h3>{name}</h3>
                {content && (
                    <p style={{width: contentWidth}}>{(fromUser ? "You: " : "") + content}</p>
                )}
            </div>
        </div>
    );
};

export default MessagePreview;