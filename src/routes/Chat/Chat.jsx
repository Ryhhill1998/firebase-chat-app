import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MessageBubble from "../../common/components/MessageBubble/MessageBubble";
import {useEffect, useRef, useState} from "react";
import NewMessageInput from "../../common/components/NewMessageInput/NewMessageInput";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {listenToSpecificUserChat, readAllUsersUnreadMessagesInChat} from "../../utils/firebase";
import {focusOutSearch, selectSelectedMessageId} from "../../features/search/searchSlice";

const Chat = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {id: chatId} = useParams();
    const userId = useSelector(selectUserId);
    const selectedMessageId = useSelector(selectSelectedMessageId);

    const [chat, setChat] = useState(null);

    useEffect(() => {
        if (!userId) return;

        listenToSpecificUserChat(chatId, userId, setChat)
    }, [chatId, userId]);

    useEffect(() => {
        if (!userId || !chat) return;

        readAllUsersUnreadMessagesInChat(chat.id, userId)
            .then(() => {
                console.log("messages read")
            });
    }, [chat, userId]);

    // window size config
    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight + "px");

    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [chat, windowInnerHeight]);

    useEffect(() => {
        const handleResize = () => {
            setWindowInnerHeight(window.innerHeight + "px");
        }

        window.addEventListener('resize', handleResize)
    }, []);

    const handleBackClick = () => {
        dispatch(focusOutSearch());
        navigate("/");
    };

    useEffect(() => {
        if (!selectedMessageId || !chat) return;

        const message = document.getElementById("message-" + selectedMessageId);
        message.scrollIntoView();
    }, [selectedMessageId, chat]);

    if (!chat) {
        return <></>;
    }

    return (
        <div className="chat-container container" style={{height: windowInnerHeight}}>
            <header>
                <nav>
                    <div className="container-lhs">
                        <button onClick={handleBackClick}>
                            <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                        </button>

                        <div className="user-details-container">
                            <UserIcon size="medium" colour={chat.otherUserDetails.iconColour}/>
                            <h1>
                                <span>{chat.otherUserDetails.displayName}</span>
                                <span>Active 9h ago</span>
                            </h1>
                        </div>
                    </div>

                    <div className="container-rhs">
                        <FontAwesomeIcon className="icon" icon={faPhone}/>
                        <FontAwesomeIcon className="icon" icon={faVideo}/>
                    </div>
                </nav>
            </header>

            <div className="message-bubbles-container" ref={divRef}>
                {chat.messages && chat.messages.map(({id, content, fromUserId, read}, i) => (
                    <MessageBubble
                        key={i}
                        content={content}
                        fromUser={fromUserId === userId}
                        iconColour={chat.otherUserDetails.iconColour}
                        lastMessage={i === chat.messages.length - 1}
                        read={read}
                        index={i}
                    />
                ))}
            </div>

            <NewMessageInput userId={userId} otherUserId={chat.otherUserDetails.id}/>
        </div>
    );
};

export default Chat;