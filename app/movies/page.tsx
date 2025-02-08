"use client"
import React from 'react';

import { AuthProvider } from '@/app/context/AuthContext';
import '../globals.css';

import Movies from '@/app/components/Movies';

const App = () => {
  return (
    <AuthProvider>
        <div className="min-h-screen">

        
        <Movies />
        </div>
      
    </AuthProvider>
  );
};

export default App;
