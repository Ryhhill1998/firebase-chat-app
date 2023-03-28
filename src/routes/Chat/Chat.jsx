import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MessageBubble from "../../common/components/MessageBubble/MessageBubble";
import {useEffect, useRef, useState} from "react";
import NewMessageInput from "../../common/components/NewMessageInput/NewMessageInput";
import {useNavigate} from "react-router-dom";

import CHATS from "../../data/chats.json";
import USERS from "../../data/users.json";

const currentUserId = 1;

const Chat = () => {

    const [chat, setChat] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const id = +window.location.href.split("/").at(-1);
        const foundChat = CHATS.chats.find(chat => chat.id === id);
        setChat(foundChat);

        const {userIds} = foundChat;
        const otherUserId = userIds.find(userId => userId !== currentUserId);
        const name = USERS.users.find(user => user.id === otherUserId).name;
        setUsername(name);
    }, []);

    const navigate = useNavigate();

    const [messages, setMessages] = useState(null);
    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight + "px");

    useEffect(() => {
        if (!chat) return;
        setMessages(chat.messages);
    }, [chat]);

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

    const handleMessageSend = (content) => {
        const id = messages.length + 1;

        const newMessage = {
            id,
            fromUserId: currentUserId,
            timeStamp: id,
            content
        };

        setMessages([...messages, newMessage]);
    }

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
                                <span>{username}</span>
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
                {messages && messages.map(({id, content, fromUserId}) => (
                    <MessageBubble key={id} id={id} content={content} fromUser={fromUserId === currentUserId}/>
                ))}
            </div>

            <NewMessageInput handleSend={handleMessageSend}/>
        </div>
    );
};

export default Chat;