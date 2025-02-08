"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


interface FormData {
  username: string;
  email: string;
  password: string;
  // Add other form fields
}

const Signup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginRedirect = () => {
    router.push('/');
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("User Registered Successfully");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
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
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md z-10"
      >
        <h1 className="text-xl font-bold mb-6 text-center">Sign Up for MovieDB</h1>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Username  
          </label>
          <input
            type="text"
            id="name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
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
          Sign Up
        </button>

        {/* Login Redirect */}
        <p 
          className="mt-[15px] text-sm text-center text-gray-[300] hover:text-white cursor-pointer underline"
          onClick={handleLoginRedirect}
        >
          Already have an account? Login here!
        </p>

      </form>

    </div >
  );
};

export default Signup;
