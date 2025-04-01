"use client"
import { createContext, useState, useEffect, useContext } from 'react';
const MovieBookContext = createContext();
export const useFavorites = () => useContext(MovieBookContext);
export const MovieBookProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);
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
};
