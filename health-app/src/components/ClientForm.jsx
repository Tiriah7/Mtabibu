import { useState } from 'react';
import API from '../api';

export default function ClientForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const res = await API.post('/clients', form);
    onAdd(res.data);
    setForm({ name: '', age: '', gender: '' });
  };

  return (
    <div>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <button onClick={submit}>Register Client</button>
    </div>
  );
}
