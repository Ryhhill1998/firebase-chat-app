import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faMagnifyingGlass, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MessageBubble from "../../common/components/MessageBubble/MessageBubble";

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

const testMessage = chatDetails.messages[0];

const Chat = () => {
    return (
        <div className="chat-container container">
            <header>
                <nav>
                    <div className="container-lhs">
                        <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
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

            <div className="message-bubbles-container">
                {chatDetails.messages.map(({id, content, fromUserId}) => (
                    <MessageBubble key={id} content={content} fromUser={fromUserId === userId}/>
                ))}
            </div>
        </div>
    );
};

export default Chat;