import { useState, useEffect, useCallback } from 'react';
import api from '../../api/axios';
import KanbanBoard from '../../components/kanban/KanbanBoard';
import Spinner from '../../components/common/Spinner';

export default function MaintenanceKanban() {
  const [columns, setColumns] = useState({
    NEW: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      const { data } = await api.get('/maintenance/');
      const items = data.results || data;

      const grouped = { NEW: [], IN_PROGRESS: [], COMPLETED: [] };
      items.forEach((item) => {
        if (grouped[item.status]) {
          grouped[item.status].push(item);
        }
      });

      setColumns(grouped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId ? sourceCol : [...columns[destination.droppableId]];

    const [moved] = sourceCol.splice(source.index, 1);
    moved.status = destination.droppableId;
    destCol.splice(destination.index, 0, moved);

    setColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    }));

    try {
      await api.patch(`/maintenance/${draggableId}/`, {
        status: destination.droppableId,
      });
    } catch (err) {
      console.error('Failed to update status:', err);
      fetchRequests();
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Maintenance Board</h1>
      <KanbanBoard columns={columns} onDragEnd={onDragEnd} />
    </div>
  );
}
