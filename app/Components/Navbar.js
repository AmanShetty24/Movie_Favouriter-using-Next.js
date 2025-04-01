"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "../contexts/SearchContext"; 

export default function Navbar() {
  const { setSearch } = useSearch();
  const [input, setInput] = useState('');

  const handleSearchChange = (e) => {
    setInput(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <Image src="/MovieLogo.svg" alt="Logo" width={100} height={100} />

      <input
        className="p-2 rounded bg-gray-700 text-white border border-gray-500 focus:ring-2 focus:ring-red-400"
        type="text"
        value={input}
        onChange={handleSearchChange}
        placeholder="Search for Movies..."
      />
      
      <div className="flex gap-4">
        <Link href="/" className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">Home</Link>
        <Link href="/favourite" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Favorites</Link>
        <Link href="/login" className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">Login</Link>
      </div>
    </nav>
  );
}