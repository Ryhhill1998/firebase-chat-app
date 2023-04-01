import "./NewMessage.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {focusOutSearch, resetSearchQuery, resetUserSearchResults} from "../../features/search/searchSlice";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import SearchResults from "../../common/components/SearchResults/SearchResults";

const NewMessage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleCancelClick = () => {
        dispatch(focusOutSearch());
        dispatch(resetSearchQuery());
        dispatch(resetUserSearchResults());
        navigate("/");
    };

    return (
        <div className="new-message-page-container container">
            <header>
                <button onClick={handleCancelClick}>Cancel</button>
                <h1>New message</h1>
                <button style={{visibility: "hidden"}}>Cancel</button>
            </header>

            <SearchBar navigateOnFocus={false}/>

            <SearchResults/>
        </div>
    );
};

export default NewMessage;