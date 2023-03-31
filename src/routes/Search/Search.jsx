import "./Search.css";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {focusOutSearch} from "../../features/search/searchSlice";
import {useEffect, useState} from "react";
import {getThreeMostRecentChatsByUserId} from "../../utils/firebase";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";

const Search = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const handleCancelClick = () => {
        dispatch(focusOutSearch());
        navigate("/");
    };

    const [suggestions, setSuggestions] = useState(null);

    const getSuggestions = async (id) => {
        return await getThreeMostRecentChatsByUserId(id);
    };

    useEffect(() => {
        if (!userId) return;

        getSuggestions(userId)
            .then(response => setSuggestions(response));
    }, [userId]);

    return (
        <div className="search-page-container container">
            <header>
                <SearchBar/>
                <button onClick={handleCancelClick}>Cancel</button>
            </header>

            <h2>Suggested</h2>

            {suggestions && suggestions.map(suggestion => {
                const {id, otherUserDetails} = suggestion;
                const {displayName, iconColour} = otherUserDetails;

                return (
                    <MessagePreview id={id} name={displayName} iconColour={iconColour}/>
                )
            })}
        </div>
    );
};

export default Search;