import Navbar from "./Components/Navbar";
import { SearchProvider } from "./contexts/SearchContext";
import { MovieBookProvider } from "./contexts/MovieBookContext";
import { FavoritesProvider } from "./contexts/FavouritesContext"; 
import "./globals.css"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider> 
          <SearchProvider>
            <MovieBookProvider>  
              <Navbar />
              {children}
            </MovieBookProvider>
          </SearchProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
