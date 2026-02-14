import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/common/Spinner';

export default function TenantDashboard() {
  const { user } = useAuth();
  const [lease, setLease] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leaseRes, reqRes] = await Promise.all([
          api.get('/leases/'),
          api.get('/maintenance/'),
        ]);
        const leases = leaseRes.data.results || leaseRes.data;
        setLease(leases.find((l) => l.is_active) || leases[0] || null);
        setRequests(reqRes.data.results || reqRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome, {user?.first_name || user?.username}!
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📋 Lease Details</h3>
          {lease ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Unit</span><span className="font-medium">{lease.unit_label}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Monthly Rent</span><span className="font-bold text-green-600">${lease.monthly_rent}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Period</span><span className="font-medium">{lease.start_date} — {lease.end_date}</span></div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${lease.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {lease.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No active lease found.</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">💳 Pay Rent</h3>
            <p className="text-indigo-100 text-sm mb-4">
              {lease ? `Your rent of $${lease.monthly_rent} is due.` : 'No active lease to pay.'}
            </p>
          </div>
          <Link to="/tenant/pay-rent" className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg text-center hover:bg-indigo-50 transition-colors">
            Pay Now →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">🔧 Report an Issue</h3>
            <p className="text-gray-400 text-sm mb-4">Something broken? Submit a maintenance request.</p>
          </div>
          <Link to="/tenant/report-issue" className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg text-center hover:bg-indigo-700 transition-colors">
            Report Issue →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">My Maintenance Requests</h3>
        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.slice(0, 5).map((req) => (
              <div key={req.uuid} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{req.title}</p>
                  <p className="text-xs text-gray-400">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  req.status === 'NEW' ? 'bg-blue-100 text-blue-800'
                    : req.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>{req.status.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No maintenance requests yet.</p>
        )}
      </div>
    </div>
  );
}
