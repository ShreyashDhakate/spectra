'use client';

import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <div className="min-h-[92vh] bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">About MovieFlix</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/loginbg.jpg" // Updated image path
              alt="Movie Collage"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-300 mb-6">
              MovieFlix was born out of a passion for cinema and a desire to bring the magic of movies to everyone, everywhere. Founded in 2023, we&apos;ve quickly grown to become one of the leading movie streaming platforms, offering a vast library of films from classic masterpieces to the latest blockbusters.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              We believe in the power of storytelling and its ability to inspire, educate, and entertain. Our mission is to provide a seamless, high-quality streaming experience that connects movie lovers with the films they love and helps them discover new favorites.
            </p>
            <div className="bg-blue-600 text-white py-3 px-6 rounded-full inline-block hover:bg-blue-700 transition duration-300 cursor-pointer">
              Join MovieFlix Today
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
