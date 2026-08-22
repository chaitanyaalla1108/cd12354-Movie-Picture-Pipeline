import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (movie && movie.id) {
      axios
        .get(`http://ae0a38c41e72c476abcc9e12fdaba59b-1758238877.us-east-1.elb.amazonaws.com/movies/${movie.id}`)
        .then((response) => {
          setDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div>
      <h2>Movie Details</h2>
      <h3>{details?.title || movie.title}</h3>
      <p>{details?.description || details?.synopsis || ''}</p>
    </div>
  );
}

export default MovieDetails;