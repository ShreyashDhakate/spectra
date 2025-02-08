"use client"

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '@/app/context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  useEffect(() => {
    // If already authenticated, redirect to intended path or dashboard
    if (isAuthenticated) {
      const intendedPath = localStorage.getItem('intendedPath') || '/dashboard';
      localStorage.removeItem('intendedPath'); // Clear it after use
      router.push(intendedPath);
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    console.log(formData.username, formData.password);
    
    try {
      await login(formData.username, formData.password);
      // Redirect will happen in useEffect
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    
      <div
  className="flex items-center justify-center text-white"
  style={{
    height: '100vh',
    backgroundImage: "url('/loginbg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
><div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} theme="dark" />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md z-10"
      >
        <h1 className="text-xl font-bold mb-6 text-center">Login to MovieDB</h1>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-auto py-[10px] rounded-full font-semibold transition duration-[250ms]"
        >
          Login
        </button>

        {/* Signup Redirect */}
        <p className="mt-[15px] text-sm text-center text-gray-[300] hover:text-white cursor-pointer underline"
           onClick={() => router.push('/signup')}>
          Don&apos;t have an account? Sign up here!
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
