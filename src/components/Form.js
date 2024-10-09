import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

const Movies = ({mode}) => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');    
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);  
  
    
    const searchMovies = async (e) => {
      e.preventDefault();  
      setLoading(true);     
      setError(null);     
        
  
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovies(data.Search);  
          setLoading(false);
        } else {
          setError(data.Error);
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    const addToWatchlist = async (movie) => {
      try {
        const response = await axios.get('http://localhost:3001/api/watchlist');
        const currentWatchlist = response.data;
    
        if (currentWatchlist.length < 15) {
          await axios.post('http://localhost:3001/api/watchlist', {
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          });
          alert('Movie added to watchlist');
        } else {
          alert('Watchlist is full. You can only add 20 movies.');
        }
      } catch (error) {
        console.error('Error adding to watchlist', error);
        alert('Failed to add the movie to the watchlist.');
      }
      };
    if (loading) return <div style={{color: mode==='light'?'#000000':'#ffffff'}}>Loading...</div>;
    if (error) return <div style={{color: mode==='light'?'#000000':'#ffffff'}}>Error: {error}</div>;

    return (
        <div style={{color: mode==='light'?'#000000':'#ffffff'}}>

          <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
            <h2>Search for Movies</h2>


            <form onSubmit={searchMovies}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter movie title"
                />
                <button type="submit">Search</button>
            </form>
            <h1>Movies List</h1>
            </div>
 

            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {movies.map((movie) => (

                    <div key={movie.imdbID} className="card" style={{ width: '18rem', margin: '10px',backgroundColor: mode==='light'?'#ffffff':'#1D2D44',color: mode==='light'?'#000000':'#ffffff',borderColor:'#000000'}}>

                        <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                        <div className="card-body">
                            <h5 className="card-title">{movie.Title}</h5>
                            <p className="card-text">Year: {movie.Year}</p>
                            <a href="#" class="btn btn-primary" onClick={() => addToWatchlist(movie)}>Add To WatchList</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
