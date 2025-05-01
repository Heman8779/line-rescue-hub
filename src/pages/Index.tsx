
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthContainer from '@/components/auth/AuthContainer';
import Dashboard from '@/components/dashboard/Dashboard';

const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show a loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center relative">
            <div className="absolute inline-flex h-14 w-14 rounded-full border-t-4 border-b-4 border-line-blue animate-spin"></div>
            <div className="h-8 w-8 bg-line-blue rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <Dashboard /> : <AuthContainer />;
};

export default Index;
