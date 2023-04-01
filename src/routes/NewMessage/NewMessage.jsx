import "./NewMessage.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {
    focusOutSearch,
    resetSearchQuery,
    resetUserSearchResults,
    selectSearchQuery
} from "../../features/search/searchSlice";
import {selectAllChats} from "../../features/chats/chatsSlice";
import {getAllUsers} from "../../utils/firebase";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import {useEffect, useState} from "react";

const NewMessage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const searchQuery = useSelector(selectSearchQuery);
    const allChats = useSelector(selectAllChats);

    const [allUsers, setAllUsers] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [userResults, setUserResults] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getAllUsers()
            .then(results => setAllUsers(results.filter(result => result.id !== userId)));
    }, [userId]);

    useEffect(() => {
        if (!allChats) {
            navigate("/");
        } else {
            setSuggestions(allChats.slice(0, 3));
        }
    }, [allChats]);

    useEffect(() => {
        if (!allUsers) return;

        let foundUsers;

        if (!searchQuery) {
            foundUsers = null;
        } else {
            foundUsers = allUsers
                .filter(user => user.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setUserResults(foundUsers);
    }, [allUsers, searchQuery]);

    const handleCancelClick = () => {
        dispatch(focusOutSearch());
        dispatch(resetSearchQuery());
        dispatch(resetUserSearchResults());
        navigate("/");
    };

    return (
        <div className="search-page-container container">
            <header>
                <SearchBar/>
                <button onClick={handleCancelClick}>Cancel</button>
            </header>

            {!userResults && suggestions && (
                <div>
                    <h2>Suggested</h2>

                    {suggestions.map(suggestion => {
                            const {id, otherUserDetails} = suggestion;
                            const {displayName, iconColour} = otherUserDetails;

                            return (
                                <MessagePreview key={id} id={id} name={displayName} iconColour={iconColour}/>
                            )
                        }
                    )}
                </div>
            )}

            {userResults?.length > 0 && (
                <div>
                    <h2>Users</h2>

                    {userResults.map(user => {
                        const {id, displayName, iconColour} = user;

                        return (
                            <MessagePreview key={id} otherUserId={id} name={displayName} iconColour={iconColour}/>
                        )
                    })}
                </div>
            )}

            {searchQuery && !userResults?.length && (
                <div>
                    <h2>No results</h2>
                </div>
            )}
        </div>
    );
};

export default NewMessage;