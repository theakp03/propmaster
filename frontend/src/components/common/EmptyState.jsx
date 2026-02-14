export default function EmptyState({ icon = '📭', title, message, action }) {
  return (
    <div className="text-center py-16">
      <span className="text-6xl">{icon}</span>
      <h3 className="mt-4 text-lg font-semibold text-gray-700">{title}</h3>
      <p className="mt-2 text-gray-400">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
