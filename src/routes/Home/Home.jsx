import './Home.css';
import SearchBar from "../../features/search/SearchBar/SearchBar";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import ActiveUsersSlider from "../../common/components/ActiveUsersSlider/ActiveUsersSlider";
import {useNavigate} from "react-router-dom";
import {faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {selectAllChats} from "../../features/chats/chatsSlice";
import {useEffect} from "react";

const Home = () => {

    const userId = useSelector(selectUserId);
    const chats = useSelector(selectAllChats);

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("profile");
    };

    useEffect(() => {
        console.log(chats);
    }, [chats])

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
