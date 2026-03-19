import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import '../App.css';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/clients').then(res => setClients(res.data));
  }, []);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="client-list-wrapper">
      <div className="search-bar">
        <input
          placeholder="Search clients by name…"
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="programs-empty">No clients found.</p>
      ) : (
        <ul className="client-list">
          {filtered.map(c => (
            <li key={c._id}>
              <Link to={`/clients/${c._id}`}>
                {c.name}
                <span className="client-badge">{c.gender}, {c.age} yrs</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}