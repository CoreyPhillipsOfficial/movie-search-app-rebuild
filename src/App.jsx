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

function App() {
  const [query, setQuery] = useState('');
  // console.log(setQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  const searchMovies = async () => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      // console.log('API KEY:', API_KEY);
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();

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
    </div>
  );
}

export default App
