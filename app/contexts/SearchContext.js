"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }) {
  const [search, setSearch] = useState(""); 
  
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
