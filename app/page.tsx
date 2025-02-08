
import { AuthProvider } from './context/AuthContext';
import './globals.css';
import HomePage from './home/page';

const App = () => { 
  return (
    <AuthProvider>
      <HomePage/>
    </AuthProvider>
  );
};

export default App;
