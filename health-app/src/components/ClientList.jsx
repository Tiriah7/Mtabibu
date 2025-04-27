import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/clients').then(res => setClients(res.data));
  }, []);

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input placeholder="Search clients..." onChange={e => setSearch(e.target.value)} />
      <ul>
        {filtered.map(c => (
          <li key={c._id}>
            <Link to={`/clients/${c._id}`}>{c.name} ({c.gender}, {c.age})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
