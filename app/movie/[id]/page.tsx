"use client"
import MovieInfo from '@/app/components/Movieinfo';
import Navbar from '@/app/components/Navbar';
import { AuthProvider } from '@/app/context/AuthContext'; 
import { useParams } from 'next/navigation';

export default function MoviePage() {
  const { id } = useParams();
  return (
    <AuthProvider>
        <Navbar/>
        <MovieInfo id={id as string}/>
      </AuthProvider>
 
  );
}
