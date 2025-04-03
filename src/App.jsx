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
  const [query, setquery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // SearchMovies() will go here
  }

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
    </div>
  );
}

export default App
