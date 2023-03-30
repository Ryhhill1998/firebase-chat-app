import "./ActiveUserIcon.css";
import UserIcon from "../UserIcon/UserIcon";
import {createChatDoc, getChat} from "../../../utils/firebase";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";

const ActiveUserIcon = ({id, size}) => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const handleClick = async () => {
        const chat = await getChat(userId, id);
        let chatId = chat?.id;

        if (!chatId) {
            chatId = await createChatDoc(userId, id);
        }

        navigate("chats/" + chatId);
    };

    return (
        <div className="active-user-icon" onClick={() => handleClick(id)}>
            <UserIcon size={size}/>
            <div className="active-indicator"></div>
        </div>
    );
};

export default ActiveUserIcon;