import { useState } from 'react';
import Button from '../common/Button';

export default function PaymentForm({ lease, onSubmit, loading }) {
  const [form, setForm] = useState({
    amount: lease?.monthly_rent || '',
    payment_type: 'RENT',
    notes: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      lease: lease?.id,
      date_paid: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
        <input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} className="input-field" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
        <select name="payment_type" value={form.payment_type} onChange={handleChange} className="input-field">
          <option value="RENT">Rent</option>
          <option value="LATE_FEE">Late Fee</option>
          <option value="DEPOSIT">Security Deposit</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="input-field" rows="2" />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Submit Payment'}</Button>
    </form>
  );
}
