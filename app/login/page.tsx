'use client';

import '../globals.css';
import Login from '../components/LoginPage';
import NotificationProvider from '../components/NotificationProvider';
import { AuthProvider } from '../context/AuthContext';

const App = () => {


 

  return (
    <AuthProvider>
      <NotificationProvider />
      <Login />
    </AuthProvider>
  );
};

export default App;
