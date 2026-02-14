export default function MaintenanceListWidget({ requests = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        🔧 Open Maintenance Requests
      </h3>
      {requests.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          No open requests - everything is in great shape! 🎉
        </p>
      ) : (
        <div className="divide-y">
          {requests.slice(0, 8).map((req) => (
            <div key={req.uuid} className="flex items-center justify-between py-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{req.title}</p>
                <p className="text-xs text-gray-400">
                  {req.unit_label} {req.tenant_detail?.full_name && `• ${req.tenant_detail.full_name}`}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    req.priority === 'HIGH' || req.priority === 'URGENT'
                      ? 'bg-red-100 text-red-700'
                      : req.priority === 'MEDIUM'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {req.priority}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    req.status === 'NEW'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {req.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
