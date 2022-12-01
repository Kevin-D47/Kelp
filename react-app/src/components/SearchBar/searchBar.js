import { useState, useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import "./searchBar.css";


const SearchBar = () => {

    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState('')

    const changeSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (searchTerm.length > 0) {
            history.push({
                pathname: `/search/${searchTerm}`,
                state: { filterState: '' },
            });
            setSearchTerm('')
        } else {
            return alert(
                'Please provide a search input'
            )
        }
    }

    return (
        <>
            <div className="search-bar-container">
                <form className="searchBar-inner-container" onSubmit={handleSubmit}>
                    <input
                        className="search-bar-input"
                        type="search"
                        value={searchTerm}
                        placeholder={"Search By Restaurant Name"}
                        onChange={changeSearchTerm}
                    />
                </form>
                <div
                    className="searchBar-button-container"
                    onClick={handleSubmit}
                >
                    <div className="magnifying-glass">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
