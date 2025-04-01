"use client"
import { createContext, useContext, useState, useEffect } from "react";
const FavoritesContext = createContext();
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavorites(savedFavorites);
  }, []);
  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.imdbID === movie.imdbID)
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites)); 
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
export function useFavorites() {
  return useContext(FavoritesContext);
}
