import "./Search.css";
import SearchBar from "../../features/search/SearchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {focusOutSearch} from "../../features/search/searchSlice";
import {useEffect} from "react";

const Search = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const handleCancelClick = () => {
        dispatch(focusOutSearch());
        navigate("/");
    };

    const getSuggestions = () => {
    };

    return (
        <div className="search-page-container container">
            <header>
                <SearchBar/>
                <button onClick={handleCancelClick}>Cancel</button>
            </header>
        </div>
    );
};

export default Search;