import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


const Home = () => {
    const [movieData, setMovieData] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    let [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handleSearch = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_API_KEY
            }
        };

        if (searchInput !== "") {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=${page}`, options)
                .then(response => response.json())
                .then(response => setMovieData(response))
                .catch(err => console.error(err));
        }
    };

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
    //Popular Movies
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.REACT_APP_API_KEYKEY
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

            <div className="card-div flex align ">
                <div className="flex ">
                    <div className="input-group mb-3 flex  " id="search-bar">

                        <input
                            type="text"
                            className="form-control "
                            placeholder="Search"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <div className="input-group-append ">
                            <FaSearch size={58} className="btn btn-outline-secondary search-btn"
                                onClick={handleSearch}
                                type="button"
                            >Button</FaSearch>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row flex space-cards center">
                {movieCards}
            </div>

            <nav>
                <ul className="pagination center pagination-style">
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
                </ul>
            </nav>

        </div>
    )

};

export default Home;