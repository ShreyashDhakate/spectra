import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
