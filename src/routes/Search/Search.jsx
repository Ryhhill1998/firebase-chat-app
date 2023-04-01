import "./Search.css";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {focusOutSearch, resetSearchQuery, resetUserSearchResults} from "../../features/search/searchSlice";
import SearchResults from "../../common/components/SearchResults/SearchResults";

const Search = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

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

            <SearchResults/>
        </div>
    );
};

export default Search;