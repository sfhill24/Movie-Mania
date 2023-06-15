import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [movieData, setMovieData] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlkMjRmNmU3YTAzZmZjYTE1YWZiZGY4ZjRkM2QyOCIsInN1YiI6IjY0ODcyMzUxZDJiMjA5MDBhZDNkOGEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PShhPcFP3C6aB0zDpylL8-OcPN_z8OsF-iLRYmkHQcI'
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setMovieData(response))
            .catch(err => console.error(err));
    };


    //Popular Movies
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlkMjRmNmU3YTAzZmZjYTE1YWZiZGY4ZjRkM2QyOCIsInN1YiI6IjY0ODcyMzUxZDJiMjA5MDBhZDNkOGEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PShhPcFP3C6aB0zDpylL8-OcPN_z8OsF-iLRYmkHQcI'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setMovieData(response))
            .catch(err => console.error(err));
    }, []);

    if (movieData == null) {
        return <div className="no-projects-message">Loading...</div>;
    }

    const movieCards = movieData.results.map((movie) => {
        if (movie.poster_path == null) {
            return (null)
        }

        return (<div className="col-md-auto d-flex" onClick={() => navigate(`/details/${movie.id}`)}  >
            <MovieCard
                imageUrl={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
             />
        </div>);
    })


    return (
        <div className="flex-container">
            <Jumbotron />

            <div className="card-div">
                <div className="flex center">
                    <div className="input-group mb-3" id="search-bar">

                        <input
                            type="text"
                            className="form-control "
                            placeholder="Search"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary a:hover"
                                onClick={handleSearch}
                                type="button"
                                id="a:hover">Button</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {movieCards}
                </div>
            </div>

        </div>
    )

};

export default Home;