import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import ActiveUserIcon from "../../common/components/ActiveUserIcon/ActiveUserIcon";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import {useSwipeable} from "react-swipeable";
import {useMemo, useRef, useState} from "react";
import ActiveUsersSlider from "../../common/components/ActiveUsersSlider/ActiveUsersSlider";

const userId = 1;

const message1 = {
    id: 100,
    fromId: 1,
    toId: 2,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur.`
};

const messages = new Array(8).fill(0);

const Home = () => {

    return (
        <div className="home-container container">
            <h1>Chats</h1>

            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <ActiveUsersSlider/>

            <div className="message-previews-container">
                {messages.map((_, i) => (
                    <MessagePreview
                        key={message1.id * (i + 1)}
                        content={message1.content}
                        name="Ryan Henzell-Hill"
                        fromUser={userId === message1.fromId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
