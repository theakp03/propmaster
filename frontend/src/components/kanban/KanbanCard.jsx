export default function KanbanCard({ request, provided, snapshot }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-white rounded-lg shadow-sm border p-4 cursor-grab active:cursor-grabbing transition-shadow ${
        snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-300' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-sm">{request.title}</h3>
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold ${
            request.priority === 'HIGH' || request.priority === 'URGENT'
              ? 'bg-red-100 text-red-700'
              : request.priority === 'MEDIUM'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {request.priority}
        </span>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 mb-2">{request.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{request.unit_label}</span>
        <span>{new Date(request.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
