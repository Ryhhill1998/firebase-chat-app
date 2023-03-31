import "./SearchBar.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {focusInSearch, selectSearchIsFocused, selectSearchQuery} from "../searchSlice";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const searchQuery = useSelector(selectSearchQuery);
    const focused = useSelector(selectSearchIsFocused);

    const handleChange = ({target}) => {
        const {value} = target;
        dispatch(searchQuery(value));
    };

    const handleFocus = () => {
        if (!focused) {
            dispatch(focusInSearch());
            navigate("/search");
        }
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
        </div>
    );
};

export default SearchBar;