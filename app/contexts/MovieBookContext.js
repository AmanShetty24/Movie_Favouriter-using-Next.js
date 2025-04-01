"use client";
import { createContext, useContext, useState } from 'react';

const MovieBookContext = createContext();

export function useFavorites() {
  const context = useContext(MovieBookContext);
  if (!context) {
    throw new Error("useFavorites must be used within a MovieBookProvider");
  }
  return context;
}

export function MovieBookProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.imdbID === movie.imdbID)) {
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  return (
    <MovieBookContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </MovieBookContext.Provider>
  );
}
