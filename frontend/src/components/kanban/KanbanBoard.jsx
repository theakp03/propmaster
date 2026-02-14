import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';

const COLUMNS_CONFIG = {
  NEW: { title: '🆕 New', color: 'bg-blue-50 border-blue-300' },
  IN_PROGRESS: { title: '🔨 In Progress', color: 'bg-yellow-50 border-yellow-300' },
  COMPLETED: { title: '✅ Done', color: 'bg-green-50 border-green-300' },
};

export default function KanbanBoard({ columns, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
        {Object.entries(COLUMNS_CONFIG).map(([columnId, config]) => (
          <KanbanColumn
            key={columnId}
            columnId={columnId}
            title={config.title}
            color={config.color}
            items={columns[columnId] || []}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
