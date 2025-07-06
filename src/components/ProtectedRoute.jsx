import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isBuilderAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-16 h-16 animate-spin mb-4" />
        <h1 className="text-2xl font-bold">Loading...</h1>
        <p className="text-blue-200">Please wait a moment.</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page, but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isBuilderAdmin && !user) {
    // User is authenticated but doesn't have builder-admin role
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 