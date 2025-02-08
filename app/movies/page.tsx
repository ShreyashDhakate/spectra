"use client"
import React, { useEffect } from 'react';

import { AuthProvider } from '@/app/context/AuthContext';
import '../globals.css';

import Movies from '@/app/components/Movies';
import { useRouter } from 'next/navigation';

    const App = () => {
  const router = useRouter();
  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/login'); // Redirect to home if already logged in
      }
    }
  }, [router]);
  return (
    <AuthProvider>
        <div className="min-h-screen">

        
        <Movies />
        </div>
      
    </AuthProvider>
  );
};

export default App;
