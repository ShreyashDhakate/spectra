import { AppProps } from 'next/app';
import { AuthProvider } from './context/AuthContext';
import './globals.css';
import Login from './components/LoginPage';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
};

export default App;
