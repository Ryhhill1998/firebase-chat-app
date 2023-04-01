import "./SearchResults.css";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import {selectSearchQuery} from "../../../features/search/searchSlice";
import {selectAllChats} from "../../../features/chats/chatsSlice";
import {getAllUsers} from "../../../utils/firebase";
import MessagePreview from "../MessagePreview/MessagePreview";
import {useEffect, useState} from "react";

const SearchResults = ({otherResults}) => {

    const navigate = useNavigate();

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

    return (
        <div className="search-results-container">
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

            {!otherResults && searchQuery && !userResults?.length && (
                <div>
                    <h2>No results</h2>
                </div>
            )}
        </div>
    );
};

export default SearchResults;