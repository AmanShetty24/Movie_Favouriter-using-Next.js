"use client"
import { useFavorites } from "../contexts/MovieBookContext";
import MovieCard from "../Components/MovieCard";

export default function FavouritePage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Your Favorites</h2>
        <p>No movies added to favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favorites.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
