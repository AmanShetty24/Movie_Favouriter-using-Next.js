"use client";
import { useState, useEffect } from "react";

export function useMovieDetails(imdbID, apiKey, isModalOpen) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isModalOpen || !imdbID) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
        );
        
        const data = await response.json();
        
        if (data.Response === "True") {
          setDetails(data);
        } else {
          setError(data.Error || "Failed to fetch movie details");
        }
      } catch (err) {
        setError("An error occurred while fetching movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID, apiKey, isModalOpen]);

  return { details, loading, error };
}