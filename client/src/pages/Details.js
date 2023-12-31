import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, FaShareAlt } from "react-icons/fa";

const Details = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [votes, setVotes] = useState({});
    const location = useLocation();

    useEffect(() => {

        //get movieId from url
        let getMovieId = location.pathname.split('/');

        let movieId = getMovieId[2];

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlkMjRmNmU3YTAzZmZjYTE1YWZiZGY4ZjRkM2QyOCIsInN1YiI6IjY0ODcyMzUxZDJiMjA5MDBhZDNkOGEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PShhPcFP3C6aB0zDpylL8-OcPN_z8OsF-iLRYmkHQcI'
            }
        };
        //movieDetails api call
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovieDetails(response))
            .catch(err => console.error(err));

        //movieCredits api call
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => setCredits(response))
            .catch(err => console.error(err));

        //votes api call 
        fetch(`https://movie-mania-f897cac9052d.herokuapp.com/movies/${movieId}/votes`, options)
            .then(response => response.json())
            .then(response => setVotes(response))
            .catch(err => console.error(err));
    }, []);


 // show loading while making api call
    if (movieDetails == null || credits == null || votes == null) {
        return <div className="no-projects-message">Loading...</div>;
    }

    //only show first 3 actors from credits api results
    const actors = credits.cast.slice(0, 3).map((x) => x.name).join(", ");

    //only show first 3 genres from movieDetails api results
    const genres = movieDetails.genres.slice(0, 3).map((x) => x.name).join(", ");

    //convert date from api to year
    const year = new Date(movieDetails.release_date).getFullYear();

    //create upvotes and send results to server
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

        fetch(`https://movie-mania-f897cac9052d.herokuapp.com/movies/${movieId}/votes`, options)
            .then(response => response.json())
            .then(response => setVotes(response))
            .catch(err => console.error(err));
    }

    //create downvotes and send results to server
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

        fetch(`https://movie-mania-f897cac9052d.herokuapp.com/movies/${movieId}/votes`, options)
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