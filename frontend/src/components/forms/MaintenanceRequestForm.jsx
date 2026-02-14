import { useState } from 'react';
import Button from '../common/Button';

export default function MaintenanceRequestForm({ units = [], onSubmit, loading }) {
  const [form, setForm] = useState({
    unit: '',
    title: '',
    description: '',
    priority: 'MEDIUM',
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (photo) formData.append('photo', photo);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {units.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <select name="unit" value={form.unit} onChange={handleChange} className="input-field" required>
            <option value="">Select unit...</option>
            {units.map((u) => (
              <option key={u.uuid} value={u.id}>{u.unit_number || u.uuid}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="input-field" required placeholder="e.g., Leaking faucet in kitchen" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input-field" rows="4" required placeholder="Please describe the issue in detail..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange} className="input-field">
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Photo (optional)</label>
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="input-field" />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</Button>
    </form>
  );
}
