import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import Home from '../components/Home';
import Navbar from '../components/Navbar';


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
        <Navbar/>
      <Home/>
    </AuthProvider>
  );
};

export default App;
