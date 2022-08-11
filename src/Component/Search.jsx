import React from 'react';
import { useGlobalContext } from './Context';

const Search = () => {
    const { search, setSearch, isError } = useGlobalContext()
    return (
        <>
            <section className="search-section">
                <h2>Your Favourite Movie</h2>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input type="text"
                            placeholder='Search Here'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>
                <div className="card-error">
                    <p>{isError.show && isError.msg}</p>
                </div>
            </section>
        </>
    );
};

export default Search;