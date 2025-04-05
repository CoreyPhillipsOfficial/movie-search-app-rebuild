/*
States needed:

query: string - User input
movies: array - Fetched search results
loading: boolean - Show spinner while fetching
error: string -	Error message to display
selectedMovieId: string -	ID of the expanded movie
selectedMovieDetails:	object - Cache movie details by ID
*/


import { useState } from 'react'
import './App.css'
import MovieDetails from './MovieDetails';

function App() {
  const [query, setQuery] = useState('');
  // console.log(setQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedMovieId, setselectedMovieId] = useState(null);
  const [selectedMovieDetails, setselectedMovieDetails] = useState({});

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  const searchMovies = async () => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      console.log('API KEY:', API_KEY);
      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();
      console.log(data); // prints the response


      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No movies found.');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', query); // print the query
    if (!query.trim()) return;
    searchMovies();
  };

  const handleMovieClick = async (id) => {
    // Toggle collapse if the same card is clicked
    if (selectedMovieId === id) {
      setselectedMovieId(null);
      return
    }

    setError(null);
    setLoading(true);

    try {
      // If we haven't fetched this movie yet, fetch it
      if (!selectedMovieDetails[id]) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
        const data = await res.json();

        setselectedMovieDetails((prev) => ({
          ...prev,
          [id]: data
        }));
      }

      setselectedMovieId(id);
    } catch (err) {
      setError('failed to fetch movie details')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='Search for a movie...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="results">
        {movies.map((movie) => (
          <div
            className={`movie-card ${selectedMovieId === movie.imdbID ? 'expanded' : ''}`}
            key={movie.imdbID}
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

            {/* Render details if this is the selected card */}
            {selectedMovieId === movie.imdbID && selectedMovieDetails[movie.imdbID] && (
              <MovieDetails movie={selectedMovieDetails[movie.imdbID]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
