import "./MessagePreview.css";
import UserIcon from "../UserIcon/UserIcon";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import {getChatId} from "../../../utils/firebase";

const MessagePreview = ({id, otherUserId, content, name, fromUser, iconColour, unread, navigateRoute}) => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const handleClick = async () => {
        if (!id) {
            id = await getChatId(userId, otherUserId);
        }

        const route = navigateRoute ? navigateRoute : "/chats/" + id;

        navigate(route);
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