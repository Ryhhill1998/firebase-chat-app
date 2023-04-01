import './Home.css';
import SearchBar from "../../features/search/SearchBar/SearchBar";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import ActiveUsersSlider from "../../common/components/ActiveUsersSlider/ActiveUsersSlider";
import {useNavigate} from "react-router-dom";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {listenToAllUserChats} from "../../utils/firebase";
import {setAllChats} from "../../features/chats/chatsSlice";

const Home = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!userId) return;
        listenToAllUserChats(userId, setChats);
    }, [userId]);

    useEffect(() => {
        if (!chats) return;

        dispatch(setAllChats(chats));
    }, [chats]);

    const handleProfileClick = () => {
        navigate("profile");
    };

    return (
        <div className="home-container container">
            <header>
                <button onClick={handleProfileClick}>
                    <FontAwesomeIcon className="icon" icon={faUser}/>
                </button>

                <h1>Chats</h1>

                <button>
                    <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
                </button>
            </header>

            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <ActiveUsersSlider/>

            <div className="message-previews-container">
                {chats && chats.map(chat => {
                    const {id, messages, otherUserDetails} = chat;
                    const lastMessage = messages?.at(-1);

                    return lastMessage && (
                        <MessagePreview
                            key={id}
                            id={id}
                            name={otherUserDetails.displayName}
                            content={lastMessage.content}
                            fromUser={userId === lastMessage.fromUserId}
                            iconColour={chat.otherUserDetails.iconColour}
                            unread={userId === lastMessage.toUserId && !lastMessage.read}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
