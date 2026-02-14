import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const landlordLinks = [
  { to: '/landlord/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/landlord/properties', label: 'Properties', icon: '🏢' },
  { to: '/landlord/units', label: 'Units', icon: '🚪' },
  { to: '/landlord/leases', label: 'Leases', icon: '📋' },
  { to: '/landlord/tenants', label: 'Tenants', icon: '👥' },
  { to: '/landlord/maintenance', label: 'Maintenance', icon: '🔧' },
  { to: '/landlord/payments', label: 'Payments', icon: '💰' },
];

const tenantLinks = [
  { to: '/tenant/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/tenant/lease', label: 'My Lease', icon: '📋' },
  { to: '/tenant/pay-rent', label: 'Pay Rent', icon: '💳' },
  { to: '/tenant/maintenance', label: 'Maintenance', icon: '🔧' },
  { to: '/tenant/report-issue', label: 'Report Issue', icon: '⚠️' },
];

export default function Sidebar() {
  const { isLandlord, user, logout } = useAuth();
  const links = isLandlord ? landlordLinks : tenantLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600">🏠 PropMaster</h1>
        <p className="text-sm text-gray-400 mt-1">{user?.role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
            {user?.first_name?.[0] || user?.username?.[0] || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {user?.full_name || user?.username}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full btn-secondary text-sm text-red-600 border-red-200 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
