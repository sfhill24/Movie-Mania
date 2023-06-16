import React from 'react';
import { Link } from "react-router-dom";

function MovieCard({imageUrl}) {
    return (
        <div className="card movie-card zoom" >
            <img className="card-img" src={imageUrl} alt="movieImage" />
          
        </div>
  
    )
};

export default MovieCard;