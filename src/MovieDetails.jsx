function MovieDetails({ movie }) {
    return (
        <div className="movie-details">
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
    )
}

export default MovieDetails;