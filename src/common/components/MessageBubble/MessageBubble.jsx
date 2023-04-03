import "./MessageBubble.css";
import UserIcon from "../UserIcon/UserIcon";
import {useSelector} from "react-redux";
import {selectSearchQuery, selectSelectedMessageId} from "../../../features/search/searchSlice";
import {useEffect, useState} from "react";

const MessageBubble = ({index, content, fromUser, iconColour, lastMessage, read}) => {

    const selectedMessageId = useSelector(selectSelectedMessageId);
    const searchString = useSelector(selectSearchQuery);

    const [splitContent, setSplitContent] = useState(null);

    useEffect(() => {
        if (!searchString || !selectedMessageId || index !== selectedMessageId) return;

        const stringIndex = content.toLowerCase().indexOf(searchString.toLowerCase());
        const nextWhiteSpaceIndex = content.indexOf(" ", stringIndex);

        if (nextWhiteSpaceIndex === -1) {
            setSplitContent({
                prefix: null,
                highlightedWord: content,
                suffix: null
            });
        } else {
            setSplitContent({
                prefix: content.slice(0, stringIndex),
                highlightedWord: content.slice(stringIndex, nextWhiteSpaceIndex),
                suffix: content.slice(nextWhiteSpaceIndex)
            });
        }
    }, [content, index, searchString, selectedMessageId]);

    return (
        <div
            id={`message-${index}`}
            className={`message-bubble-container ${fromUser ? "sent" : "received"}`}
        >
            <div>
                {!fromUser && <UserIcon size="small" colour={iconColour}/>}
                <div className="message-bubble">
                    {!splitContent && <p>{content}</p>}

                    {splitContent && (
                        <p>
                            {splitContent?.prefix && splitContent.prefix}
                            <span className="highlighted-word">{splitContent.highlightedWord}</span>
                            {splitContent?.suffix && splitContent.suffix}
                        </p>
                    )}
                </div>
            </div>

            {lastMessage && fromUser && (
                <p>{read ? "Read" : "Sent"}</p>
            )}
        </div>
    );
};

export default MessageBubble;