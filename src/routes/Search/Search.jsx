import "./Search.css";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {
    focusOutSearch,
    resetSearchQuery,
    selectSearchQuery,
    selectUserSearchResults
} from "../../features/search/searchSlice";
import {useEffect, useState} from "react";
import {getAllChatsByUserId, getThreeMostRecentChatsByUserId} from "../../utils/firebase";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";

const Search = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const searchQuery = useSelector(selectSearchQuery);
    const userSearchResults = useSelector(selectUserSearchResults);

    const handleCancelClick = () => {
        dispatch(focusOutSearch());
        dispatch(resetSearchQuery());
        navigate("/");
    };

    const [suggestions, setSuggestions] = useState(null);

    const getSuggestions = async (id) => {
        return await getThreeMostRecentChatsByUserId(id);
    };

    useEffect(() => {
        if (!userId) return;

        getSuggestions(userId)
            .then(results => setSuggestions(results));
    }, [userId]);

    // TODO - search messages by search query

    return (
        <div className="search-page-container container">
            <header>
                <SearchBar/>
                <button onClick={handleCancelClick}>Cancel</button>
            </header>


            {!userSearchResults && suggestions && (
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

            {userSearchResults && userSearchResults.length > 0 && (
                <div>
                    <h2>Users</h2>

                    {userSearchResults.map(user => {
                        const {id, displayName, iconColour} = user;

                        return (
                            <MessagePreview key={id} id={id} name={displayName} iconColour={iconColour}/>
                        )
                    })}
                </div>
            )}

            {searchQuery && !userSearchResults?.length && (
                <div>
                    <h2>No results</h2>
                </div>
            )}
        </div>
    );
};

export default Search;