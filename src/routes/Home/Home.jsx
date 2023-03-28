import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import ActiveUsersSlider from "../../common/components/ActiveUsersSlider/ActiveUsersSlider";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {faBars, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import USERS from "../../data/users.json";
import CHATS from "../../data/chats.json";

const userId = 1;

const Home = () => {

    const navigate = useNavigate();

    const [chats, setChats] = useState(CHATS.chats);
    const [users, setUsers] = useState(USERS.users);

    const handlePreviewClick = (id) => {
        navigate("/chats/" + id);
    };

    return (
        <div className="home-container container">
            <header>
                <FontAwesomeIcon className="icon" icon={faBars}/>
                <h1>Chats</h1>
                <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
            </header>

            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <ActiveUsersSlider/>

            <div className="message-previews-container">
                {chats && chats.map((chat, i) => {
                    const {id, messages, userIds} = chat;
                    const otherUserId = userIds.find(userId => userId !== id);
                    const name = users.find(user => user.id === otherUserId).name;

                    return (
                        <MessagePreview
                            key={id * (i + 1)}
                            id={id}
                            name={name}
                            content={messages.at(-1).content}
                            fromUser={userId === messages.at(-1).fromUserId}
                            handleClick={handlePreviewClick}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default Home;
