import "./Chat.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {faChevronLeft, faMagnifyingGlass, faPhone, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 3,
            fromUserId: 2,
            timeStamp: 3,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 4,
            fromUserId: 2,
            timeStamp: 4,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 5,
            fromUserId: 2,
            timeStamp: 5,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 6,
            fromUserId: 2,
            timeStamp: 6,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 7,
            fromUserId: 2,
            timeStamp: 7,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
        {
            id: 8,
            fromUserId: 2,
            timeStamp: 8,
            content: "Haha. I know, when I first saw it was going to be called CAZ, I wasn't impressed! Xx"
        },
    ],
}

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
        </div>
    );
};

export default Chat;