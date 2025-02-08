'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";

// Define the movie type
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
}

interface MovieInfoProps {
  id: string; // Expect 'id' as a prop
}

const Movinfo = ({ id }: MovieInfoProps) => {
  const [movie, setMovie] = useState<Movie | null>(null); // Properly type the state as Movie or null

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/movie/${id}`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.error('Error fetching movie:', err));
    }
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="h-[80vh] min-w-full px-4 md:px-8 lg:px-16">
  <motion.div
    className="movinfo bg-gray-900 text-white rounded-xl shadow-xl border border-gray-800 mx-auto my-8 p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* 📌 3-Grid Layout */}
    <div className="grid grid-cols-12 gap-6">
      
      {/* 🔹 Left Grid - Poster & Movie Stats */}
      <motion.div 
        className="col-span-2 space-y-4" 
        whileHover={{ scale: 1.02 }}
      >
        {/* Poster */}
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-700">
          <img
            src={movie.poster || "/thumb.webp"}
            alt={movie.title}
            className="w-full h-[350px] object-cover"
          />
        </div>

        {/* Movie Stats */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-gray-300">
          <h2 className="text-lg font-bold text-blue-400">Movie Stats</h2>
          <p>🕒 Duration: {movie.runtime || "N/A"} mins</p>
          <p>📅 Released: {movie.year}</p>
          <p>💰 Budget: {movie.budget || "N/A"}</p>
          <p>🎯 Box Office: {movie.boxOffice || "N/A"}</p>
        </div>
      </motion.div>

      {/* 🔹 Center Grid - Trailer & Movie Details */}
      <div className="col-span-7 space-y-6">
        {/* 🎬 Movie Trailer */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/uGvBsBI1Eos?autoplay=1&mute=1"
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>

        {/* 🎭 Movie Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 space-y-4">
          {/* Title & Rating */}
          <h1 className="text-4xl font-extrabold text-blue-400 drop-shadow-lg">
            {movie.title} <span className="text-gray-400">({movie.year})</span>
          </h1>
          <div className="flex items-center gap-6 text-gray-300 text-lg">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-md font-bold">
              IMDb {movie.imdb?.rating}/10
            </span>
            <span className="text-gray-400">{movie.genres?.join(", ")}</span>
          </div>

          {/* More Info */}
          {[
            { label: "Languages", data: movie.languages },
            { label: "Cast", data: movie.cast },
            { label: "Directed by", data: movie.directors },
          ].map((info, idx) => (
            <div key={idx} className="border-b border-gray-700 pb-3">
              <span className="font-semibold text-lg text-blue-400">
                {info.label}:
              </span>
              <ul className="list-disc pl-6 text-gray-300">
                {info.data?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Right Grid - Suggested Movies */}
      <motion.div 
        className="col-span-3 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-lg font-bold text-blue-400">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {[1, 2, 3, 4].map((num) => (
            <motion.div
              key={num}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-lg border border-gray-600"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={`/thumb.webp`}
                className="w-full h-32 object-cover"
                alt="Suggested Movie"
              />
              <p className="p-2 text-gray-300 text-center">Movie Title {num}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
</div>

  );
};

export default Movinfo;
