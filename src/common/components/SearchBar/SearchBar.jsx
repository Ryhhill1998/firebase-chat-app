import "./SearchBar.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = ({target}) => {
        const {value} = target;
        setSearchQuery(value);
    };

    const handleFocus = (event) => {
        console.log(event)
    };

    return (
        <div className="search-bar">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
            <input
                type="text"
                name="searchQuery"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search"
                autoComplete="off"
                onFocus={handleFocus}
            />
        </div>
    );
};

export default SearchBar;