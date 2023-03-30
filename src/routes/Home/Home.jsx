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
import {getAllChatsByUserId, getAllUsers, signOutUser} from "../../utils/firebase";

export const chatsLoader = async () => {
    return await getAllChatsByUserId("k1XLSiGMaRSLucA7arcZQYtJ6r93");
};

const Home = () => {

    const chats = useLoaderData();

    const navigate = useNavigate();

    const handlePreviewClick = (id) => {
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

            {/*<div className="message-previews-container">*/}
            {/*    {chats && chats.map((chat, i) => {*/}
            {/*        const {id, messages, userIds} = chat;*/}
            {/*        const otherUserId = userIds.find(userId => userId !== id);*/}
            {/*        const name = users.find(user => user.id === otherUserId).name;*/}

            {/*        return (*/}
            {/*            <MessagePreview*/}
            {/*                key={id * (i + 1)}*/}
            {/*                id={id}*/}
            {/*                name={name}*/}
            {/*                content={messages.at(-1).content}*/}
            {/*                fromUser={userId === messages.at(-1).fromUserId}*/}
            {/*                handleClick={handlePreviewClick}*/}
            {/*            />*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
}

export default Home;
