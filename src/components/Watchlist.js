import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = ({mode}) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await axios.get('http://localhost:3001/api/watchlist');
      setWatchlist(response.data);
    };

    fetchWatchlist();
  }, []);

  const deleteMovie = async (imdbID) => {
    try {
      await axios.delete(`http://localhost:3001/api/watchlist/${imdbID}`); 
      setWatchlist(watchlist.filter((movie) => movie.imdbID !== imdbID)); 
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h1 style={{color: mode==='light'?'#000000':'#ffffff'}}>Your Watchlist</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={movie.poster} className="card-img-top" alt={movie.title} />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">Year: {movie.year}</p>
              <a className="btn btn-primary" onClick={() => deleteMovie(movie.imdbID)}>Delete </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
