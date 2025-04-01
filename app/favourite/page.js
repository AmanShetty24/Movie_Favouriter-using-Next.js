"use client";
import { useFavorites } from "../contexts/MovieBookContext";
import MovieCard from "../Components/MovieCard";
import { useSearch } from "../contexts/SearchContext";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { search } = useSearch();

  const filteredFavorites = favorites.filter((movie) => {
    const title = movie.title || ''; 
    const desc = movie.desc || ''; 
    const query = search || ''; 

    return (
      title.toLowerCase().includes(query.toLowerCase()) ||
      desc.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="flex flex-wrap gap-4">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No favorite movies found matching your search.</p>
        )}
      </div>
    </div>
  );
}
