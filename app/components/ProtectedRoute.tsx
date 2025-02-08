"use client"
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the attempted URL to redirect back after login
      localStorage.setItem('intendedPath', pathname);
      router.push('/login');
    }
  }, [isAuthenticated, router, pathname]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute; 