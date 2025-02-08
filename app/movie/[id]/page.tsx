"use client"
import MovieInfo from '@/app/components/Movieinfo';
import Navbar from '@/app/components/Navbar';
import { AuthProvider } from '@/app/context/AuthContext'; 
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useParams } from 'next/navigation';

export default function MoviePage() {
  const { id } = useParams();
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Navbar/>
        <MovieInfo id={id as string}/>
      </ProtectedRoute>
    </AuthProvider>
  );
}
