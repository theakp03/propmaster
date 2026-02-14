import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    if (user?.role === 'LANDLORD') return <Navigate to="/landlord/dashboard" replace />;
    if (user?.role === 'TENANT') return <Navigate to="/tenant/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">🏠 PropMaster</h1>
          <p className="text-gray-500 mt-2">Property Management Made Simple</p>
        </div>
        <div className="card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
