import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import ActiveUsersSlider from "../../common/components/ActiveUsersSlider/ActiveUsersSlider";
import {useEffect, useState} from "react";
import {useLoaderData, useNavigate} from "react-router-dom";
import {faBars, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {listenToAllUserChats, signOutUser} from "../../utils/firebase";

const Home = () => {

    const userId = useSelector(selectUserId);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!userId) return;
        listenToAllUserChats(userId, setChats);
    }, [userId]);

    useEffect(() => {
        console.log(chats)
    }, [chats])

    const navigate = useNavigate();

    const handlePreviewClick = (id, readingMessage) => {
        console.log(readingMessage)
        navigate("/chats/" + id);
    };

    const handleSignOutClick = async () => {
        await signOutUser();
    };

    return (
        <div className="home-container container">
            <header>
                <FontAwesomeIcon className="icon" icon={faBars}/>
                <h1>Chats</h1>
                <button onClick={handleSignOutClick}>Sign out</button>
                <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
            </header>

            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <ActiveUsersSlider/>

            <div className="message-previews-container">
                {chats && chats.map((chat, i) => {
                    const {id, messages, otherUserDetails} = chat;
                    const lastMessage = messages.at(-1);
                    console.log(lastMessage)

                    return messages && (
                        <MessagePreview
                            key={id}
                            id={id}
                            name={otherUserDetails.displayName}
                            content={lastMessage.content}
                            fromUser={userId === lastMessage.fromUserId}
                            unread={userId === lastMessage.toUserId && !lastMessage.read}
                            handleClick={handlePreviewClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
