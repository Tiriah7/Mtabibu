import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';
import '../App.css';

export default function ClientProfile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [, setPrograms] = useState([]);

  useEffect(() => {
    API.get(`/clients/${id}`).then(res => setClient(res.data));
    API.get('/programs').then(res => setPrograms(res.data));
  }, [id]);

  if (!client) return (
    <div className="loading-state">
      <span className="loading-dot" />
      <span className="loading-dot" />
      <span className="loading-dot" />
      <p style={{ marginTop: '1rem' }}>Loading profile…</p>
    </div>
  );

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>{client.name}</h2>
        <div className="profile-meta">
          <span>👤 {client.gender}</span>
          <span>🎂 {client.age} years old</span>
        </div>
      </div>

      <div className="profile-body">
        <h3 className="profile-section-title">Enrolled Programs</h3>

        {client.programs.length === 0 ? (
          <p className="programs-empty">This client is not enrolled in any programs yet.</p>
        ) : (
          <ul className="programs-enrolled">
            {client.programs.map(p => (
              <li key={p._id}>{p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}