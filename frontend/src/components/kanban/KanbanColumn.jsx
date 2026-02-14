import { Droppable, Draggable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ columnId, title, color, items = [] }) {
  return (
    <div className={`rounded-xl border-2 p-4 ${color}`}>
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        {title}
        <span className="ml-2 text-sm font-normal text-gray-400">({items.length})</span>
      </h2>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[200px] rounded-lg p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-white/60' : ''
            }`}
          >
            {items.map((request, index) => (
              <Draggable key={request.uuid} draggableId={request.uuid} index={index}>
                {(provided, snapshot) => (
                  <KanbanCard request={request} provided={provided} snapshot={snapshot} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
