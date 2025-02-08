import React from 'react';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
// Use a simple page component
export default function HomePage() {
  return (
    <main>
      <Navbar/>
      <Home />
    </main>
  );
}
