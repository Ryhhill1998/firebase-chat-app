import "./ActiveUserIcon.css";
import UserIcon from "../UserIcon/UserIcon";
import {createNewChat, getChat} from "../../../utils/firebase";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";

const ActiveUserIcon = ({id, size}) => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const handleClick = async () => {
        let chatId = await getChat(userId, id)?.id;

        if (!chatId) {
            chatId = await createNewChat(userId, id, "test");
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