import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import Login from '../components/LoginPage';

const App = () => { 
  return (
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
};

export default App;
