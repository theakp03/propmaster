import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { LandlordRoute } from './guards/LandlordRoute';
import { TenantRoute } from './guards/TenantRoute';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Landlord Pages
import LandlordDashboard from './pages/landlord/LandlordDashboard';
import PropertiesPage from './pages/landlord/PropertiesPage';
import PropertyDetailPage from './pages/landlord/PropertyDetailPage';
import UnitsPage from './pages/landlord/UnitsPage';
import LeasesPage from './pages/landlord/LeasesPage';
import TenantsPage from './pages/landlord/TenantsPage';
import MaintenanceKanban from './pages/landlord/MaintenanceKanban';
import PaymentsPage from './pages/landlord/PaymentsPage';

// Tenant Pages
import TenantDashboard from './pages/tenant/TenantDashboard';
import MyLeasePage from './pages/tenant/MyLeasePage';
import PayRentPage from './pages/tenant/PayRentPage';
import MaintenancePage from './pages/tenant/MaintenancePage';
import ReportIssuePage from './pages/tenant/ReportIssuePage';

function RoleBasedRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user?.role === 'LANDLORD') return <Navigate to="/landlord/dashboard" replace />;
  if (user?.role === 'TENANT') return <Navigate to="/tenant/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* SMART ROOT REDIRECT */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<RoleBasedRedirect />} />
          </Route>

          {/* LANDLORD ROUTES */}
          <Route element={<LandlordRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
              <Route path="/landlord/properties" element={<PropertiesPage />} />
              <Route path="/landlord/properties/:uuid" element={<PropertyDetailPage />} />
              <Route path="/landlord/units" element={<UnitsPage />} />
              <Route path="/landlord/leases" element={<LeasesPage />} />
              <Route path="/landlord/tenants" element={<TenantsPage />} />
              <Route path="/landlord/maintenance" element={<MaintenanceKanban />} />
              <Route path="/landlord/payments" element={<PaymentsPage />} />
            </Route>
          </Route>

          {/* TENANT ROUTES */}
          <Route element={<TenantRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/tenant/dashboard" element={<TenantDashboard />} />
              <Route path="/tenant/lease" element={<MyLeasePage />} />
              <Route path="/tenant/pay-rent" element={<PayRentPage />} />
              <Route path="/tenant/maintenance" element={<MaintenancePage />} />
              <Route path="/tenant/report-issue" element={<ReportIssuePage />} />
            </Route>
          </Route>

          {/* CATCH-ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
