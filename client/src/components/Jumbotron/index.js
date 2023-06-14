import React from 'react';
import { Link } from "react-router";

function Jumbotron() {
    return (
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
                        <div className="card" >
                            {//<img className="card-img-top" src="..." alt="Card image cap" />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Jumbotron;