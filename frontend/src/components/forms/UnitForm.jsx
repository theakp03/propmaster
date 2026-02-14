import { useState } from 'react';
import Button from '../common/Button';

export default function UnitForm({ propertyId, initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    property: propertyId || initialData.property || '',
    unit_number: initialData.unit_number || '',
    bedroom_count: initialData.bedroom_count || 1,
    bathroom_count: initialData.bathroom_count || 1,
    square_feet: initialData.square_feet || '',
    rent_price: initialData.rent_price || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
        <input name="unit_number" value={form.unit_number} onChange={handleChange} className="input-field" required placeholder="e.g., Apt 4B" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <input name="bedroom_count" type="number" min="0" value={form.bedroom_count} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <input name="bathroom_count" type="number" min="0" step="0.5" value={form.bathroom_count} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sq Ft</label>
          <input name="square_feet" type="number" min="0" value={form.square_feet} onChange={handleChange} className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label>
        <input name="rent_price" type="number" min="0" step="0.01" value={form.rent_price} onChange={handleChange} className="input-field" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input-field" rows="2" />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Unit'}</Button>
    </form>
  );
}
