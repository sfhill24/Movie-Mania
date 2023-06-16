import React from 'react';
import { Link } from "react-router-dom";

//Added API log to source calls per TMBD api documentation
function Jumbotron() {
    return (
        <div className="container-fluid ">
            <div className="jumbo-pic flex center">
                <img className="logo" src={require("../../../src/assets/movie1.png")} alt="logo" />
            </div>
           
        </div>
    )
};

export default Jumbotron;