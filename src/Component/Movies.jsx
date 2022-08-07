import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './Context';
import './Style.css'

const Movies = () => {
    const { movies, isError, isLoading } = useGlobalContext();
    return (
        <>
            <section className="movie-page">
                <div className="container grid grid-4-col">
                    {
                        movies.map((movie) => {
                            const { imdbID, Title, Poster } = movie;
                            const movieName = Title.slice(0, 15)
                            return (
                                <NavLink to={`movie/${imdbID}`} key={imdbID}>
                                    <div className="card">
                                        <div className="card-info">
                                            <h2>{movieName.length >= 15 ? movieName + '...' : movieName}</h2>
                                            <img src={Poster} alt="" />
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </section>
        </>
    );
};

export default Movies;