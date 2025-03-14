import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import About from '../components/About';
import Navbar from '../components/Navbar';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
        <Navbar/>
      <About/>
    </AuthProvider>
  );
};

export default App;
