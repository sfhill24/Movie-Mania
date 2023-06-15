import React from 'react';
import { Link } from "react-router-dom";

function MovieCard({title}) {
    return (
        <div className="card movie-card" >
            <img className="card-img" src="..." alt="Card image cap" />
            {title}
        </div>
  
    )
};

export default MovieCard;