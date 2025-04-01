"use client";
import { useState, useEffect } from "react";
import MovieCard from "./Components/MovieCard";
import { useSearch } from "./contexts/SearchContext";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;  

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useSearch();

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=marvel&page=1`
        );
        const data = await response.json();

        if (data.Response === "True" && Array.isArray(data.Search)) {
          console.log("Movies fetched:", data.Search);
          setMovies(data.Search);
        } else {
          console.error("Error fetching data:", data.Error);
          setError(data.Error || "Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Check console for details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Movie Database</h1>
        
        {loading && <p className="text-center py-4">Loading movies...</p>}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <p className="text-sm">Make sure your API key is correct and working.</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <p>No movies found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}