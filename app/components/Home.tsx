"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


type Movie = {
  _id: string;
  title: string;
  year: number;
  genre: string[];
  poster: string;
};

const Dashboard = () => {
  // Hardcoded banner movies
  const bannerMovies = useMemo(() => [
    {
      _id: 1,
      title: "Banner Movie 1",
      year: 2024,
      genre: ["Action"],
      poster: "loginbg.jpg", // Ensure these paths are correct for your images
    },
    {
      _id: 2,
      title: "Banner Movie 2",
      year: 2023,
      genre: ["Comedy"],
      poster: "movie3.jpg",
    },
    {
      _id: 3,
      title: "Banner Movie 3",
      year: 2025,
      genre: ["Drama"],
      poster: "movie1.jpg",
    },
    {
      _id: 4,
      title: "Banner Movie 4",
      year: 2022,
      genre: ["Thriller"],
      poster: "movie2.jpg",
    },
  ], []);

  // State to manage the movies fetched from the database
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const handleRedirect = (movieId: string) => {
    router.push(`/movie/${movieId}`); 
};
  // Automatic slider behavior
  useEffect(() => {
    if (bannerMovies.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMovies.length);
      }, 5000); // Slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [bannerMovies]);

  // Manual control for previous slide
  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerMovies.length) % bannerMovies.length);
  };

  // Manual control for next slide
  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMovies.length);
  };

  // Fetch movies for the grid from the database
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/movies");
        setMovies(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);




  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sliding Movie Banner */}
      <div className="relative w-full h-[50vh]  overflow-hidden z-1">
  <div
    className="flex transition-transform duration-[2000ms] ease-in-out whitespace-nowrap"
    style={{
      transform: `translateX(-${currentIndex * 100}%)`,
      width: `${bannerMovies.length * 100}%`, // Ensure proper width allocation
    }}
  >
    {bannerMovies.map((movie) => (
      <div
        key={movie._id}
        className="min-w-full max-w-full h-[100rem]  bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${movie.poster})` ,
        backgroundSize: '100% 100%',  // This stretches the image to fill the container fully
        backgroundPosition: 'center', 
      }}
      >
        <div className="p-8 bg-black/50 w-full">
          <h2 className="text-4xl text-bottom font-bold">{movie.title}</h2>
          <p className="mt-2 text-lg">{movie.year} | {movie.genre.join(", ")}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Manual controls */}
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    onClick={handlePrevSlide}
  >
    &lt;
  </button>
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    onClick={handleNextSlide}
  >
    &gt;
  </button>
</div>


      {/* Movie List */}
      <div className="px-6 py-8 bg-gray-900 mt-8">
        <h2 className="text-3xl font-semibold text-center mb-8">All Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            // Placeholder loading for movie cards
            Array(8).fill("").map((_, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg animate-pulse">
                <div className="w-full h-72 bg-gray-600 rounded-lg mb-4"></div>
                <div className="w-full h-8 bg-gray-600 rounded-lg mb-2"></div>
                <div className="w-3/4 h-8 bg-gray-600 rounded-lg"></div>
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie._id} className="bg-gray-700 p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300" onClick={() => handleRedirect(movie._id)}>
                <div
                  className="w-full h-72 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${movie.poster})` }}
                ></div>
                <h3 className="text-xl font-semibold mt-4">{movie.title}</h3>
                <p className="text-gray-300">{movie.year} | {movie.genre.join(", ")}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
