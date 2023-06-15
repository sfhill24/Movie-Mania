import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

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

    const actors = credits.cast.slice(0,3).map((x) => {
        return (<div className="col-md-auto d-flex">
            {x.name}
        </div>);
    })


    return (
        <div className="flex-container">
            <div className="row">
                <div className="col-sm-4">
                    <MovieCard
                        imageUrl={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}
                    />
                    <span className="col-sm">upvote </span>
                    <span className="col-sm">downvote </span>
                    <span className="col-sm">share </span>
                </div>



                <div className="col-sm-8">
                    <div className="row">
                        <div>{movieDetails.original_title}</div>
                        <div>{movieDetails.overview}</div>
                        <div>{actors}</div>
                        <div>{movieDetails.genres[0].name}</div>
                        <span className="col-sm">col-sm</span>
                        <span className="col-sm">{movieDetails.runtime} minutes</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Details;