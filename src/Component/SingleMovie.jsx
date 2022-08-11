import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from './Context';

const SingleMovie = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // get movies function 
    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === 'True') {
                setMovies(data);
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get the data
    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMovies(`${API}&i=${id}`)
        }, 500)
        return () => clearTimeout(timeOut)
    }, [id]);

    if (isLoading) {
        return (
            <div className="movie-section">
                <div className="loading">
                    Loading...
                </div>
            </div>
        )
    }
    console.log(movies)
    return (
        <section className="movie-section">
            <div className="movie-card">
                <figure>
                    <img src={movies.Poster} alt="" />
                </figure>

                <div className="card-content">
                    <p className="title">{movies.Title}</p>
                    <p className="card-text">{movies.Released}</p>
                    <p className="card-text">{movies.Genre}</p>
                    <p className="card-text">{movies.imdbRating}</p>
                    <p className="card-text">{movies.Country}</p>
                    <NavLink to='/' className='back-button'>Go Back</NavLink>
                </div>
            </div>
        </section>
    );
};

export default SingleMovie;