import { useState, useEffect } from 'react';
import api from '../../api/axios';
import StatsCard from '../../components/widgets/StatsCard';
import MaintenanceListWidget from '../../components/widgets/MaintenanceListWidget';
import Spinner from '../../components/common/Spinner';

export default function LandlordDashboard() {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [statsRes, maintenanceRes] = await Promise.all([
          api.get('/properties/dashboard_stats/'),
          api.get('/maintenance/'),
        ]);
        setStats(statsRes.data);
        setRecentRequests(maintenanceRes.data.results || maintenanceRes.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Income (This Month)" value={`$${Number(stats?.total_income_this_month || 0).toLocaleString()}`} icon="💰" color="green" />
        <StatsCard title="Occupancy Rate" value={`${stats?.occupancy_rate || 0}%`} icon="🏠" color="blue" />
        <StatsCard title="Total Properties" value={stats?.total_properties || 0} icon="🏢" color="indigo" />
        <StatsCard title="Open Requests" value={stats?.open_maintenance_requests || 0} icon="🔧" color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Units Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">Total Units</span><span className="font-bold">{stats?.total_units}</span></div>
            <div className="flex justify-between"><span className="text-green-600">Occupied</span><span className="font-bold text-green-600">{stats?.occupied_units}</span></div>
            <div className="flex justify-between"><span className="text-red-500">Vacant</span><span className="font-bold text-red-500">{stats?.vacant_units}</span></div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div className="bg-indigo-600 h-3 rounded-full transition-all duration-500" style={{ width: `${stats?.occupancy_rate || 0}%` }} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <MaintenanceListWidget requests={recentRequests.filter(r => ['NEW', 'IN_PROGRESS'].includes(r.status))} />
        </div>
      </div>
    </div>
  );
}
