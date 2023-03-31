import "./SearchBar.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    focusInSearch, resetSearchQuery, resetUserSearchResults,
    selectSearchIsFocused,
    selectSearchQuery,
    setSearchQuery,
    setUserSearchResults
} from "../searchSlice";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {selectUserId} from "../../user/userSlice";
import {getAllChatsByUserId, getAllUsers} from "../../../utils/firebase";

const SearchBar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const searchQuery = useSelector(selectSearchQuery);
    const focused = useSelector(selectSearchIsFocused);

    const [allUsers, setAllUsers] = useState(null);
    const [allChats, setAllChats] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getAllUsers()
            .then(results => setAllUsers(results.filter(result => result.id !== userId)));
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        getAllChatsByUserId(userId)
            .then(results => setAllChats(results))
    }, [userId]);

    const handleChange = ({target}) => {
        const {value} = target;
        dispatch(setSearchQuery(value));

        if (!value) {
            dispatch(resetUserSearchResults());
        } else {
            const userResults = allUsers
                .filter(user => user.displayName.toLowerCase().includes(value.toLowerCase()));
            dispatch(setUserSearchResults(userResults));
        }
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