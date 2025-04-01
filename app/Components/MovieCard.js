"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFavorites } from "../contexts/MovieBookContext";
import { useSearch } from "../contexts/SearchContext";
import { useMovieDetails } from "../hooks/useMovieDetails";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { search } = useSearch();  
  const router = useRouter();

  router.prefetch("/favourite");

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite(movie);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (!movie) return null;

  return (
    <>
      <div 
        className="w-[220px] h-[380px] bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
        onClick={openModal}
      >
        <div className="relative w-full h-[220px] overflow-hidden rounded-md">
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : "/fallback-poster.jpg"}
            alt={`${movie.Title} Poster`}
            width={500}
            height={750}
            className="rounded-md w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col space-y-2">
          <p className="font-bold text-lg truncate">{movie.Title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{movie.Plot || movie.Year}</p>

          <button
            className={`p-2 w-full rounded text-white transition-all duration-200 ${
              favorites.some((fav) => fav.imdbID === movie.imdbID)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleFavoriteClick}
          >
            {favorites.some((fav) => fav.imdbID === movie.imdbID) ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      {showModal && <MovieModal movie={movie} closeModal={closeModal} />}
    </>
  );
}

function MovieModal({ movie, closeModal }) {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const { details, loading, error } = useMovieDetails(movie.imdbID, API_KEY, true);
  const movieInfo = details || movie;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{movie.Title}</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src={movie.Poster !== "N/A" ? movie.Poster : "/fallback-poster.jpg"}
                alt={`${movie.Title} Poster`}
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <MovieDetailContent movie={movieInfo} />
        </div>
      </div>
    </div>
  );
}

function MovieDetailContent({ movie }) {
  return (
    <div className="w-full md:w-2/3 space-y-4">
      {[
        ["Year", movie.Year],
        ["Runtime", movie.Runtime],
        ["Genre", movie.Genre],
        ["Director", movie.Director],
        ["Actors", movie.Actors],
        ["Plot", movie.Plot],
        ["IMDB Rating", `${movie.imdbRating}/10 (${movie.imdbVotes} votes)`]
      ].map(([title, value]) => (
        value && value !== "N/A" && (
          <div key={title}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>{value}</p>
          </div>
        )
      ))}
    </div>
  );
}