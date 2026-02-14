export default function RecentPaymentsWidget({ payments = [] }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Payments</h3>
      {payments.length === 0 ? (
        <p className="text-gray-400 text-sm">No recent payments.</p>
      ) : (
        <div className="space-y-3">
          {payments.slice(0, 5).map((p) => (
            <div key={p.uuid} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{p.tenant_name}</p>
                <p className="text-xs text-gray-400">{new Date(p.date_paid).toLocaleDateString()}</p>
              </div>
              <span className="font-bold text-green-600">${p.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
