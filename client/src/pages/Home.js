import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


const Home = () => {
    const [movieData, setMovieData] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    let [page, setPage] = useState(1);
    const [showPagination, setShowPagination] = useState(false);
    const navigate = useNavigate();


    //api call to search movies
    const handleSearch = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlkMjRmNmU3YTAzZmZjYTE1YWZiZGY4ZjRkM2QyOCIsInN1YiI6IjY0ODcyMzUxZDJiMjA5MDBhZDNkOGEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PShhPcFP3C6aB0zDpylL8-OcPN_z8OsF-iLRYmkHQcI'
            }
        };

        //Don't call search if searchInput is empty
        if (searchInput !== "") {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => setMovieData(response))
                .then(response => setShowPagination(true)) //show pagination at page bottom after search
                .catch(err => console.error(err));
        }
    };

    //setting previous/next page count for pagination and search
    const previousPage = () => {
        page = page - 1;
        setPage(page);
        handleSearch();
    }

    const nextPage = () => {
        page = page + 1;
        setPage(page);
        handleSearch();
    }
    //api call to get popular movies
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

    //show loading page while making api call
    if (movieData == null) {
        return <div className="no-projects-message">Loading...</div>;
    }

    //creating movie cards from movieData results
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

            <div className="input-group mb-3 center search-style">
                <input type="text "
                    id="search-bar"
                    className="form-control"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    aria-describedby="button-addon2" />

                <FaSearch size={55} className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSearch}
                    id="button-addon2">Button</FaSearch>
            </div>

            <div className="row flex space-cards center">
                {movieCards}
            </div>

            <nav>
                {showPagination && <ul className="pagination center pagination-style">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <a className="page-link"
                            onClick={previousPage}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className={`page-item ${page === movieData.total_pages ? "disabled" : ""}`}>
                        <a className="page-link"
                            onClick={nextPage}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>}
            </nav>

        </div>
    )

};

export default Home;