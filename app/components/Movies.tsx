import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useRouter } from 'next/navigation';

interface Movie {
  title: string;
  poster?: string;
  genres?: string[];
  languages?: string[];
  year: string;
  cast?: string[];
  directors?: string[];
  imdb?: {
    rating: string;
    votes: string;
  };
  fullplot?: string;
  runtime?: string;
  budget?: string;
  boxOffice?: string;
  _id?: string;
}

const genreOptions = ["Action", "Drama", "Comedy", "Biography", "Crime", "Family", "Horror", "Sci-Fi", "Adventure", "Thriller", "Mystery", "Fantasy", "Romance", "Documentary"];

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genres: [] as string[],
    yearRange: { from: '', to: '' },
    rating: '',
  });
  const router = useRouter();
  const handleRedirect = (movieId: string) => {
    router.push(`/movie/${movieId}`); 
};  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/movies");
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleGenreChange = (genre: string) => {
    setFilters((prev) => {  
      const updatedGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: updatedGenres };
    });
  };

  const handleFilterChange = (key: string, value: string | { from: string; to: string }) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      genres: [],
      yearRange: { from: '', to: '' },
      rating: '',
    });
  };

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = filters.genres.length > 0
      ? filters.genres.every(genre => movie.genres?.includes(genre))
      : true;
    const matchesYear = filters.yearRange.from && filters.yearRange.to 
      ? Number(movie.year) >= Number(filters.yearRange.from) && Number(movie.year) <= Number(filters.yearRange.to) 
      : true;
    const matchesRating = filters.rating ? Number(movie.imdb?.rating) >= Number(filters.rating) : true;
    return matchesGenre && matchesYear && matchesRating;
  });

  return (
    <div className="bg-gray-900">
        <div className="sticky bg-black top-0 z-10">
                <Navbar/>
        </div>
    <div className=" text-white min-h-[90vh] p-8 flex">
        
      <aside className="bg-gray-800 p-6 rounded-xl w-1/5 me-6 h-[85vh] sticky top-[6.5rem] overflow-auto">
        <h2 className="text-xl mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="text-lg mb-2">Genre</h3>
          <div className="grid grid-cols-2 gap-2">
            {genreOptions.map((genre) => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg mb-2">Year Range</h3>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="From"
              className="w-1/2 p-2 bg-gray-700 rounded"
              value={filters.yearRange.from}
              onChange={(e) => handleFilterChange('yearRange', { ...filters.yearRange, from: e.target.value })}
            />
            <input
              type="number"
              placeholder="To"
              className="w-1/2 p-2 bg-gray-700 rounded"
              value={filters.yearRange.to}
              onChange={(e) => handleFilterChange('yearRange', { ...filters.yearRange, to: e.target.value })}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg mb-2">IMDB Rating</h3>
          <input
            type="number"
            placeholder="Min Rating"
            className="w-full p-2 bg-gray-700 rounded"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          />
        </div>
        
        <button className="mt-2 w-full p-2 bg-red-500 rounded" onClick={resetFilters}>Reset Filters</button>
      </aside>

      <section className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {loading ? (
          <p className="text-center col-span-3">Loading movies...</p>
        ) : (
          filteredMovies.map((movie, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl flex max-h-[16rem] hover:scale-105 hover:shadow-xl transition-all duration-300" onClick={() => handleRedirect(movie._id || ""    )}>
              <div className="w-1/3">
                <img
                  src={movie.poster || "https://via.placeholder.com/150"}   
                  alt={movie.title}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.year} | {movie.genres?.join(', ')}</p>
                <p className="text-sm text-yellow-400">IMDB: {movie.imdb?.rating || "N/A"}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
    </div>
  );
};

export default MoviesPage;