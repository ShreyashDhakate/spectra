"use client"
import { AppProps } from 'next/app';
import { AuthProvider } from '@/app/context/AuthContext';
import '../../globals.css';
import Movieinfo from '../../components/Movieinfo';
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

const App = ({ Component, pageProps }: AppProps) => {
  const { id } = useParams();
  return (
    <AuthProvider>
      <Navbar/>
      <Movieinfo id={id as string}/>
    </AuthProvider>
  );
};

export default App;
