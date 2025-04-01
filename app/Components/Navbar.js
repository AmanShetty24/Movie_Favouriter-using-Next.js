"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "../contexts/SearchContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { setSearch } = useSearch();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (e) => {
    setInput(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <nav className="p-4 bg-gray-800 text-white shadow-md relative">
      <div className="flex justify-between items-center">
        <Image src="/MovieLogo.svg" alt="Logo" width={80} height={80} />
        
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div className={`md:flex md:items-center md:gap-4 ${isOpen ? "block" : "hidden"}`}>
        <input
          className="w-full p-2 mt-3 md:mt-0 rounded bg-gray-700 text-white border border-gray-500 focus:ring-2 focus:ring-red-400"
          type="text"
          value={input}
          onChange={handleSearchChange}
          placeholder="Search for Movies..."
        />

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-3 md:mt-0">
          <Link href="/" className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-center">Home</Link>
          <Link href="/favourite" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 text-center">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}