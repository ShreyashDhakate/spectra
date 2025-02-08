'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
    profilePic?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const useAuth = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // First useEffect to handle mounting
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // Second useEffect to handle auth state
    useEffect(() => {
        const checkAuthStatus = () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('accessToken');
                setIsAuthenticated(!!token);
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (identifier: string, password: string) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/users/login",
                { username: identifier, password }
            );

            const { user, accessToken } = response.data;
            setUser(user);
            setIsAuthenticated(true);
            if (typeof window !== 'undefined') {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessToken", accessToken);
            }
            return { success: true };
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            return { success: false, error: axiosError.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        if (typeof window !== 'undefined') {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isAuthenticated");
        }
        router.push('/login');
    };

    const checkAuth = () => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem("isAuthenticated") === "true";
    };

    return { 
        login, 
        logout, 
        checkAuth, 
        isAuthenticated, 
        user, 
        isLoading
    };
}; 