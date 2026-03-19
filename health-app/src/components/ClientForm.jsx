import { useState } from 'react';
import API from '../api';
import '../App.css';

export default function ClientForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.age || !form.gender) return;
    setLoading(true);
    try {
      const res = await API.post('/clients', form);
      onAdd(res.data);
      setForm({ name: '', age: '', gender: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register Client</h2>

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          className="form-input"
          name="name"
          placeholder="e.g. Jane Mwangi"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Age</label>
        <input
          className="form-input"
          name="age"
          type="number"
          placeholder="e.g. 34"
          value={form.age}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <select
          className="form-input"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <button
        className="form-button"
        onClick={submit}
        disabled={loading || !form.name || !form.age || !form.gender}
      >
        {loading ? 'Registering…' : 'Register Client'}
      </button>
    </div>
  );
}