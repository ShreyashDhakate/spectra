
import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import Signup from '@/app/components/Signup';

const App = () => {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
};

export default App;