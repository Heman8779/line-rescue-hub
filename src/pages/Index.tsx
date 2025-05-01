
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthContainer from '@/components/auth/AuthContainer';
import Dashboard from '@/components/dashboard/Dashboard';

const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show a loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-line-gray">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-line-blue border-r-transparent align-[-0.125em]" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <Dashboard /> : <AuthContainer />;
};

export default Index;
