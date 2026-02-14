import { useState } from 'react';
import Button from '../common/Button';

export default function LeaseForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    unit: initialData.unit || '',
    tenant: initialData.tenant || '',
    start_date: initialData.start_date || '',
    end_date: initialData.end_date || '',
    monthly_rent: initialData.monthly_rent || '',
    security_deposit: initialData.security_deposit || '0.00',
    notes: initialData.notes || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input name="start_date" type="date" value={form.start_date} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input name="end_date" type="date" value={form.end_date} onChange={handleChange} className="input-field" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label>
          <input name="monthly_rent" type="number" min="0" step="0.01" value={form.monthly_rent} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit ($)</label>
          <input name="security_deposit" type="number" min="0" step="0.01" value={form.security_deposit} onChange={handleChange} className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="input-field" rows="3" />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create Lease'}</Button>
    </form>
  );
}
