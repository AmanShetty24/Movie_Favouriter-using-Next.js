import Navbar from "./Components/Navbar";
import { SearchProvider } from "./contexts/SearchContext";
import { MovieBookProvider } from "./contexts/MovieBookContext"; 
import "./globals.css"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <MovieBookProvider>  
            <Navbar />
            {children}
          </MovieBookProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
