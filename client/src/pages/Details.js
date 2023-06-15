import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, FaShareAlt } from "react-icons/fa";

const Details = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const location = useLocation();

    useEffect(() => {

        let getMovieId = location.pathname.split('/');

        let movieId = getMovieId[2];

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlkMjRmNmU3YTAzZmZjYTE1YWZiZGY4ZjRkM2QyOCIsInN1YiI6IjY0ODcyMzUxZDJiMjA5MDBhZDNkOGEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PShhPcFP3C6aB0zDpylL8-OcPN_z8OsF-iLRYmkHQcI'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovieDetails(response))
            .catch(err => console.error(err));


        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => setCredits(response))
            .catch(err => console.error(err));
    }, []);

    if (movieDetails == null || credits == null) {
        return <div className="no-projects-message">Loading...</div>;
    }

    const actors = credits.cast.slice(0, 3).map((x) => x.name).join(", ");

    const genres = movieDetails.genres.slice(0, 3).map((x) => x.name).join(", ");

    const year = new Date(movieDetails.release_date).getFullYear();

    return (
        <div className="flex-container details-page">
            <div className="row">
                <div className="col-md-4" >

                    <div className="card details-movie-card" >
                        <img className="card-img" src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="movieImage" />

                    </div>
                    <div className="icon-div">
                        <span className="col-md icons"><FaRegThumbsUp size={40}></FaRegThumbsUp></span> <span className="icons "> 500</span>
                        <span className="col-md icons"><FaRegThumbsDown size={40}></FaRegThumbsDown> </span> <span className="icons ">25</span>
                        <span className="col-md icons"><FaShareAlt size={40}></FaShareAlt> </span>
                    </div>
                </div>

                <div className="col-md-8 ">
                    <div className="row">
                        <div className="details-title">{movieDetails.original_title}</div>
                        <div>
                            <span className="col-sm">{year}</span>
                            <span>    </span>
                            <span className="col-sm">{movieDetails.runtime}m</span>
                        </div>
                        <div className="details-overview ">{movieDetails.overview}</div>
                        <div className="cast">Cast: {actors} </div>
                        <div className="cast">Genres: {genres}</div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Details;