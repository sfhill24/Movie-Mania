import React from "react";
import './App.css';
import Home from "./pages/Home";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (

    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<div></div>} />
        </Routes>
      </div>
      <Footer />
    </Router>
    /*
    <div className="container-fluid ">
      <div className="jumbo-pic flex center">
        <img className="logo" src={require("../src/assets/movie1.png")} alt="logo" />
      </div>

      <div className="card-div">
        <div className="flex center">
          <div className="input-group mb-3" id="search-bar">
            <input type="text" className="form-control " placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary a:hover" type="button" id="a:hover">Button</button>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card movie-card" >
              <img className="card-img movie-card" src="..." alt="Card image cap" />
            </div>
          </div>
          <div className="col">
            <div className="card movie-card" >
              <img className="card-img movie-card" src="..." alt="Card image cap" />
            </div>
          </div>
          <div className="col">
            <div className="card movie-card" >
              <img className="card-img movie-card" src="..." alt="Card image cap" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card movie-card" >
              <img className="card-img movie-card" src="..." alt="Card image cap" />
            </div>
          </div>
          <div className="col">
            <div className="card movie-card ">
              <img className="card-img movie-card" src="..." alt="Card image cap" />
            </div>
          </div>
          <div className="col">
            <div className="card movie-card" >
              <img className="card-img movie-card" src="..." alt="Card image cap" />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <h2>Movie Mania Ⓒ 2023 <span><img className=" source-img" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"></img> </span></h2>
      </footer>
    </div>*/


  );
}

export default App;
