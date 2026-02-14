export default function OccupancyRateWidget({ rate = 0, occupied = 0, total = 0 }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Occupancy Rate</h3>
      <div className="text-center">
        <span className="text-4xl font-bold text-indigo-600">{rate}%</span>
        <p className="text-sm text-gray-400 mt-2">{occupied} of {total} units occupied</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${rate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
