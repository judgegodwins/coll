import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import CallBoxCover from '../components/CallBoxCover';
import Loading from '../components/Loading';

import { socket } from '../AppContainer';

function SearchScreen({ username }) {
    const inputRef = useRef(null);

    const [searchValue, setSearchValue] = useState('');
    const [found, setFound] = useState([]);
    const [fetching, setFetching] = useState(false);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setFetching(true)
    }

    const handleKeyUp = (e) => {
        const caught = e.target.value;

        setTimeout(() => {
            if (caught === inputRef.current.value) {
                socket.emit('search', { keyword: searchValue }, (people) => {
                    setFound(people);
                    setFetching(false);
                });
            }
        }, 1000);
    }

    return (
        <div className="search-screen full">
            <div className="search-box">
                <Link to="/">
                    <div className="icon">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                </Link>
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    ref={inputRef}
                    placeholder="Type to search"
                />
            </div>
            {
                fetching &&
                <Loading />

            }

            {found &&
                <CallBoxCover people={found} username={username} />
            }
        </div>
    )
}

export default SearchScreen