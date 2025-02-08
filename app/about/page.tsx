"use client"
import { AuthProvider } from '../context/AuthContext';
import '../globals.css';
import About from '../components/About';
import Navbar from '../components/Navbar';

const App = () => {
  return (
    <AuthProvider>
        <Navbar/>
      <About/>
    </AuthProvider>
  );
};

export default App;
