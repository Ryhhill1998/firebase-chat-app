import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MessageBubble from "../../common/components/MessageBubble/MessageBubble";
import {useEffect, useRef, useState} from "react";
import NewMessageInput from "../../common/components/NewMessageInput/NewMessageInput";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {
    getChatFromChatId,
    getUserFromUserId,
    listenToAllUserChats,
    listenToSpecificUserChat
} from "../../utils/firebase";

export const messagesLoader = async ({params}) => {
    const chatId = params.id;
    const chat = await getChatFromChatId(chatId);

    if (!chat) {
        throw new Error("The requested chat does not exist.");
    }

    return chat;
};

const Chat = () => {

    const chat = useLoaderData();

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!chat) return;
        listenToSpecificUserChat(chat.id, setMessages);
    }, [chat]);

    useEffect(() => {
        console.log("messages:", messages)
        setMessages(chat.messages);
    }, [chat]);

    // window size config
    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight + "px");

    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [messages, windowInnerHeight]);

    useEffect(() => {
        const handleResize = () => {
            setWindowInnerHeight(window.innerHeight + "px");
        }

        window.addEventListener('resize', handleResize)
    }, []);

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <div className="chat-container container" style={{height: windowInnerHeight}}>
            <header>
                <nav>
                    <div className="container-lhs">
                        <button onClick={handleBackClick}>
                            <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                        </button>

                        <div className="user-details-container">
                            <UserIcon  size="medium"/>
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
                {messages && messages.map(({id, content, fromUserId}, i) => (
                    <MessageBubble key={i} id={id} content={content} fromUser={fromUserId === userId}/>
                ))}
            </div>

            <NewMessageInput userId={userId} otherUserId={chat.otherUserDetails.id}/>
        </div>
    );
};

export default Chat;