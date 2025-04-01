import React from "react";
import Navbar from "../Components/Navbar";
import MovieCard from "../Components/MovieCard";

export async function getServerSideProps() {
  const response = await fetch("/api/Movies");
  const movies = await response.json();
  return { props: { movies } };
}

export default function Home({ movies }) {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}