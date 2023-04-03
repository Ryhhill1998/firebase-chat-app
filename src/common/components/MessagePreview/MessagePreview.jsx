import "./MessagePreview.css";
import UserIcon from "../UserIcon/UserIcon";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import {getChatId} from "../../../utils/firebase";
import {useEffect, useState} from "react";

const MessagePreview = ({id, otherUserId, content, name, fromUser, iconColour, unread, navigateRoute, searchString}) => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [splitContent, setSplitContent] = useState();

    useEffect(() => {
        if (!content || !searchString) return;

        if (searchString) {
            const index = content.toLowerCase().indexOf(searchString.toLowerCase());
            const nextWhiteSpaceIndex = content.indexOf(" ", index);

            if (nextWhiteSpaceIndex === -1) {
                setSplitContent({
                    prefix: null,
                    highlightedWord: content,
                    suffix: null
                });
            } else {
                setSplitContent({
                    prefix: content.slice(0, index),
                    highlightedWord: content.slice(index, nextWhiteSpaceIndex),
                    suffix: content.slice(nextWhiteSpaceIndex)
                });
            }

            console.log(content)
        }
    }, [content, searchString]);

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

                {!searchString && content && (
                    <p style={{width: contentWidth}}>{(fromUser ? "You: " : "") + content}</p>
                )}

                {searchString && splitContent && (
                    <p style={{width: contentWidth}}>
                        {splitContent?.prefix && splitContent.prefix}
                        <strong>{splitContent.highlightedWord}</strong>
                        {splitContent?.suffix && splitContent.suffix}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MessagePreview;