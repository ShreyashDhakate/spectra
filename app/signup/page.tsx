import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import Signup from '../components/Signup';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Signup/>
    </AuthProvider>
  );
};

export default App;