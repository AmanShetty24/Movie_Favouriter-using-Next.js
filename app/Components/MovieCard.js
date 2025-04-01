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
    router.push("/favourite"); 
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  if (!movie) return null;
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

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
            className={`p-2 w-full rounded text-white transition-all duration-200 ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{movie.Title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
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
                <div className="w-full md:w-2/3">
                  <MovieDetailContent movie={movie} showModal={showModal} />
                  <div className="mt-6">
                    <button
                      className={`px-4 py-2 rounded text-white transition-all duration-200 ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                      onClick={(e) => handleFavoriteClick(e)}
                    >
                      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MovieDetailContent({ movie, showModal }) {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const { details, loading, error } = useMovieDetails(movie.imdbID, API_KEY, showModal);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
        <p>Error loading movie details: {error}</p>
      </div>
    );
  }

  const movieInfo = details || movie;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Year</h3>
        <p>{movieInfo.Year}</p>
      </div>
      
      {movieInfo.Runtime && (
        <div>
          <h3 className="text-lg font-semibold">Runtime</h3>
          <p>{movieInfo.Runtime}</p>
        </div>
      )}

      {movieInfo.Genre && (
        <div>
          <h3 className="text-lg font-semibold">Genre</h3>
          <p>{movieInfo.Genre}</p>
        </div>
      )}

      {movieInfo.Director && movieInfo.Director !== "N/A" && (
        <div>
          <h3 className="text-lg font-semibold">Director</h3>
          <p>{movieInfo.Director}</p>
        </div>
      )}

      {movieInfo.Actors && movieInfo.Actors !== "N/A" && (
        <div>
          <h3 className="text-lg font-semibold">Actors</h3>
          <p>{movieInfo.Actors}</p>
        </div>
      )}

      {movieInfo.Plot && movieInfo.Plot !== "N/A" && (
        <div>
          <h3 className="text-lg font-semibold">Plot</h3>
          <p>{movieInfo.Plot}</p>
        </div>
      )}

      {movieInfo.imdbRating && movieInfo.imdbRating !== "N/A" && (
        <div>
          <h3 className="text-lg font-semibold">IMDB Rating</h3>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{movieInfo.imdbRating}/10</span>
            {movieInfo.imdbVotes && (
              <span className="text-gray-500 text-sm ml-2">({movieInfo.imdbVotes} votes)</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
