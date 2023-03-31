import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MessageBubble from "../../common/components/MessageBubble/MessageBubble";
import {useEffect, useRef, useState} from "react";
import NewMessageInput from "../../common/components/NewMessageInput/NewMessageInput";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {getChatFromChatId, listenToSpecificUserChat, readAllUsersUnreadMessagesInChat} from "../../utils/firebase";

export const chatLoader = async ({params}) => {
    const {id} = params;
    const chat = await getChatFromChatId(id);

    if (!chat) {
        throw new Error("The requested chat does not exist.");
    }

    return chat;
};

const Chat = () => {

    const navigate = useNavigate();

    const {id: chatId} = useParams();
    const userId = useSelector(selectUserId);

    const [chat, setChat] = useState(useLoaderData());

    useEffect(() => {
        readAllUsersUnreadMessagesInChat(chatId, userId)
            .then(() => {
                console.log("messages read")
            });
        console.log(chat)
    }, [chat]);

    useEffect(() => {
        if (!userId) return;
        return listenToSpecificUserChat(chatId, userId, setChat);
    }, [userId]);

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
        navigate("/");
    };

    if (!chat.otherUserDetails) {
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
                            <UserIcon size="medium" colour={chat?.otherUserDetails?.iconColour}/>
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

            <div>
                <div className="message-bubbles-container" ref={divRef}>
                    {chat.messages && chat.messages.map(({id, content, fromUserId, read}, i) => (
                        <MessageBubble
                            key={i}
                            content={content}
                            fromUser={fromUserId === userId}
                            iconColour={chat.otherUserDetails.iconColour}
                            lastMessage={i === chat.messages.length - 1}
                            read={read}
                        />
                    ))}
                </div>

                <NewMessageInput userId={userId} otherUserId={chat.otherUserDetails.id}/>
            </div>
        </div>
    );
};

export default Chat;