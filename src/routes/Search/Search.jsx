import "./Search.css";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    focusOutSearch,
    resetSearchQuery, selectMessageResults,
    selectSearchQuery, setMessageResults
} from "../../features/search/searchSlice";
import SearchResults from "../../common/components/SearchResults/SearchResults";
import {selectAllChats} from "../../features/chats/chatsSlice";
import {useEffect, useState} from "react";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";

const Search = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const allChats = useSelector(selectAllChats);
    const searchQuery = useSelector(selectSearchQuery);
    const messageResults = useSelector(selectMessageResults);

    const handleCancelClick = () => {
        dispatch(focusOutSearch());
        dispatch(resetSearchQuery());
        navigate("/");
    };

    useEffect(() => {
        if (!searchQuery || searchQuery.length < 3 || !allChats) return;

        // find all messages that match the search query and add them to the chat object
        // filter by chats that have at least one matched message
        const results = allChats
            .map(chat => {
                const updatedChat = {...chat};

                updatedChat.matchedMessages = chat.messages
                    .filter(message => message.content.toLowerCase().includes(searchQuery.toLowerCase()));

                return updatedChat;
            })
            .filter(chat => chat.matchedMessages.length);

        console.log(results)

        dispatch(setMessageResults(results));
    }, [allChats, searchQuery]);

    useEffect(() => {
        if (searchQuery.length >= 3) return;

        setMessageResults(null);
    }, [searchQuery]);

    return (
        <div className="search-page-container container">
            <header>
                <SearchBar/>
                <button onClick={handleCancelClick}>Cancel</button>
            </header>

            <SearchResults otherResults={messageResults?.length > 0}/>

            {messageResults?.length > 0 && (
                <div>
                    <h2>Messages</h2>

                    {messageResults.map(result => {
                        const {id, otherUserDetails, matchedMessages} = result;
                        const {displayName, iconColour} = otherUserDetails;
                        const pluralText = matchedMessages.length > 1 ? "s" : "";
                        const content = `${matchedMessages.length} matched message${pluralText}`;

                        return (
                            <MessagePreview
                                key={id}
                                id={id}
                                name={displayName}
                                iconColour={iconColour}
                                content={content}
                                navigateRoute={"/matched-messages/" + id}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default Search;