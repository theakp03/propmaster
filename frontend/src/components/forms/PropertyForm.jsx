import { useState } from 'react';
import Button from '../common/Button';

export default function PropertyForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zip_code: initialData.zip_code || '',
    property_type: initialData.property_type || 'APARTMENT',
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="input-field" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input name="address" value={form.address} onChange={handleChange} className="input-field" required />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input name="city" value={form.city} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input name="state" value={form.state} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
          <input name="zip_code" value={form.zip_code} onChange={handleChange} className="input-field" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
        <select name="property_type" value={form.property_type} onChange={handleChange} className="input-field">
          <option value="APARTMENT">Apartment Building</option>
          <option value="HOUSE">Single Family House</option>
          <option value="CONDO">Condominium</option>
          <option value="TOWNHOUSE">Townhouse</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input-field" rows="3" />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Property'}</Button>
    </form>
  );
}
