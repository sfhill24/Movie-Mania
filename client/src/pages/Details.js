import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, FaShareAlt } from "react-icons/fa";

const Details = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [votes, setVotes] = useState({});
    const [num, setNum] = useState(1);
    const location = useLocation();

    useEffect(() => {

        let getMovieId = location.pathname.split('/');

        let movieId = getMovieId[2];

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_API_KEY
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


        fetch(`http://localhost:3001/movies/${movieId}/votes`, options)
            .then(response => response.json())
            .then(response => setVotes(response))
            .catch(err => console.error(err));
    }, []);



    if (movieDetails == null || credits == null) {
        return <div className="no-projects-message">Loading...</div>;
    }

    const actors = credits.cast.slice(0, 3).map((x) => x.name).join(", ");

    const genres = movieDetails.genres.slice(0, 3).map((x) => x.name).join(", ");

    const year = new Date(movieDetails.release_date).getFullYear();

    const upVote = () => {

        let getMovieId = location.pathname.split('/');

        let movieId = getMovieId[2];

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upvotes: true })
        };

        fetch(`http://localhost:3001/movies/${movieId}/votes`, options)
            .then(response => response.json())
            .then(response => setVotes(response))
            .catch(err => console.error(err));
    }

    const downVote = () => {

        let getMovieId = location.pathname.split('/');

        let movieId = getMovieId[2];

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upvotes: false })
        };

        fetch(`http://localhost:3001/movies/${movieId}/votes`, options)
            .then(response => response.json())
            .then(response => setVotes(response))
            .catch(err => console.error(err));
    }

    return (
        <div className="flex-container details-page">
            <div className="row">
                <div className="col-md-4" >

                    <div className="card details-movie-card " >
                        <img className="card-img " src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="movieImage" />

                    </div>
                    <div className="icon-div">
                        <span className="col-md icons" onClick={upVote}><FaRegThumbsUp size={40}></FaRegThumbsUp></span> <span className="icons "> {votes.upvotes}</span>
                        <span className="col-md icons" onClick={downVote}><FaRegThumbsDown size={40}></FaRegThumbsDown> </span> <span className="icons ">{votes.downvotes}</span>
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