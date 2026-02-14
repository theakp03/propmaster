export default function TotalIncomeWidget({ thisMonth = 0, allTime = 0 }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Income Overview</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">This Month</p>
          <p className="text-2xl font-bold text-green-600">${Number(thisMonth).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">All Time</p>
          <p className="text-xl font-semibold text-gray-700">${Number(allTime).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
