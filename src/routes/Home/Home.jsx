import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import ActiveUsersSlider from "../../common/components/ActiveUsersSlider/ActiveUsersSlider";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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

const chats = new Array(8).fill(0);

const Home = () => {

    const navigate = useNavigate();

    const [messages, setMessages] = useState(chatDetails.messages);

    const handlePreviewClick = (id) => {
        navigate("/chats/" + id);
    };

    return (
        <div className="home-container container">
            <h1>Chats</h1>

            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <ActiveUsersSlider/>

            <div className="message-previews-container">
                {chats.map((_, i) => (
                    <MessagePreview
                        key={chatDetails.id * (i + 1)}
                        id={chatDetails.id}
                        content={messages.at(-1).content}
                        name="Ryan Henzell-Hill"
                        fromUser={userId === messages.at(-1).fromUserId}
                        handleClick={handlePreviewClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
