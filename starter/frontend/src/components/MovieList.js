import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://ae0a38c41e72c476abcc9e12fdaba59b-1758238877.us-east-1.elb.amazonaws.com/movies")
  .then((response) => {
      const movieData=Array.isArray(response.data)
        ? response.data
        : response.data?.movies || response.data?.data || [];
      setMovies(movieData);
    })
    .catch((error)=>{
      console.error('Error fetching movies:',error);
      setMovies([]);
    });
  }, []);

  return (
    <ul>
      {Array.isArray(movies) && movies.map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
