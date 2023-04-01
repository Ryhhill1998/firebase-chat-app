import "./SearchBar.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    focusInSearch,
    resetSearchQuery,
    selectSearchIsFocused,
    selectSearchQuery,
    setSearchQuery,
} from "../searchSlice";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const searchQuery = useSelector(selectSearchQuery);
    const focused = useSelector(selectSearchIsFocused);

    const handleChange = ({target}) => {
        const {value} = target;
        dispatch(setSearchQuery(value));
    };

    const handleFocus = () => {
        if (!focused) {
            dispatch(focusInSearch());
            navigate("/search");
        }
    };

    const handleClearSearchClick = () => {
        dispatch(resetSearchQuery());
    };

    return (
        <div className="search-bar">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>

            <input
                type="text"
                name="searchQuery"
                value={searchQuery + ""}
                onChange={handleChange}
                placeholder="Search"
                autoComplete="off"
                onFocus={handleFocus}
                autoFocus={!!focused}
            />

            {searchQuery && (
                <button className="clear-search-button" onClick={handleClearSearchClick}>
                    <FontAwesomeIcon className="icon" icon={faCircleXmark}/>
                </button>
            )}
        </div>
    );
};

export default SearchBar;