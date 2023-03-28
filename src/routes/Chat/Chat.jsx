import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MessageBubble from "../../common/components/MessageBubble/MessageBubble";
import {useEffect, useRef, useState} from "react";
import NewMessageInput from "../../common/components/NewMessageInput/NewMessageInput";

const userId = 1;

const chatDetails = {
    id: 1,
    userId: 2,
    userName: "Carolyn H Hill",
    messages: [
        {
            id: 1,
            fromUserId: 2,
            timeStamp: 1,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 2,
            fromUserId: 2,
            timeStamp: 2,
            content: "Have you any plans for Easter weekend? Xx"
        },
        {
            id: 3,
            fromUserId: 1,
            timeStamp: 3,
            content: "I don't think so?"
        },
        {
            id: 4,
            fromUserId: 2,
            timeStamp: 4,
            content: "Just wondering if you fancy meeting up somewhere or coming over for food? Xx"
        },
        {
            id: 5,
            fromUserId: 1,
            timeStamp: 5,
            content: "Yeah. That sounds good!"
        },
        {
            id: 6,
            fromUserId: 2,
            timeStamp: 6,
            content: "Which do you fancy? Xx"
        },
        {
            id: 7,
            fromUserId: 1,
            timeStamp: 7,
            content: "I'm easy. Whichever you'd prefer"
        },
        {
            id: 8,
            fromUserId: 2,
            timeStamp: 8,
            content: "Any.. maybe we can see what the weather is like. Or just plan a takeaway? Xx"
        },
    ],
};

const Chat = () => {

    const [messages, setMessages] = useState(chatDetails.messages);

    const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight + "px");

    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [messages, windowInnerHeight]);

    const handleMessageSend = (content) => {
        const id = messages.length + 1;

        const newMessage = {
            id,
            fromUserId: userId,
            timeStamp: id,
            content
        };

        setMessages([...messages, newMessage]);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowInnerHeight(window.innerHeight + "px");
        }

        window.addEventListener('resize', handleResize)
    }, []);

    return (
        <div className="chat-container container" style={{height: windowInnerHeight}}>
            <header>
                <nav>
                    <div className="container-lhs">
                        <button>
                            <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                        </button>

                        <div className="user-details-container">
                            <UserIcon  size="medium"/>
                            <h1>
                                <span>{chatDetails.userName}</span>
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
                    <MessageBubble key={id} id={id} content={content} fromUser={fromUserId === userId}/>
                ))}
            </div>

            <NewMessageInput handleSend={handleMessageSend}/>
        </div>
    );
};

export default Chat;