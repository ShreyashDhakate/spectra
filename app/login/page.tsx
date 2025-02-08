import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import Login from '../components/LoginPage';
import NotificationProvider from '../components/NotificationProvider';

const App = () => { 
  return (
    <AuthProvider>
      <NotificationProvider />
      <Login/>
    </AuthProvider>
  );
};

export default App;
