import { useState, useEffect } from 'react';
import API from '../api';
import '../App.css';

export default function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programRes, clientRes] = await Promise.all([
          API.get('/programs'),
          API.get('/clients'),
        ]);
        setPrograms(programRes.data);
        setClients(clientRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const addProgram = async () => {
    if (!name.trim()) return;
    try {
      const res = await API.post('/programs', { name });
      setPrograms([...programs, res.data]);
      setName('');
      setError(null);
    } catch {
      setError('Failed to add program');
    }
  };

  const enrollClient = async () => {
    try {
      await API.post('/clients/enroll', {
        clientId: selectedClient,
        programId: selectedProgram,
      });
      setSelectedClient('');
      setSelectedProgram('');
      setError(null);
      alert('Client enrolled successfully!');
    } catch {
      setError('Failed to enroll client');
    }
  };

  return (
    <div className="programs-wrapper">

      {/* Create Program */}
      <div className="programs-section">
        <h2 className="section-heading">Create Program</h2>
        <div className="inline-input-row">
          <input
            placeholder="Program name, e.g. Maternal Health"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addProgram()}
          />
          <button className="btn-primary" onClick={addProgram} disabled={!name.trim()}>
            Add Program
          </button>
        </div>
      </div>

      {/* Enroll Client */}
      <div className="programs-section">
        <h2 className="section-heading">Enroll Client to Program</h2>
        <div className="enroll-selects">
          <select
            value={selectedClient}
            onChange={e => setSelectedClient(e.target.value)}
          >
            <option value="">Select Client</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>
                {c.name} — Age {c.age}
              </option>
            ))}
          </select>

          <select
            value={selectedProgram}
            onChange={e => setSelectedProgram(e.target.value)}
          >
            <option value="">Select Program</option>
            {programs.map(p => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            className="btn-success"
            onClick={enrollClient}
            disabled={!selectedClient || !selectedProgram}
          >
            Enroll Client
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}
      </div>

      {/* Existing Programs */}
      <div className="programs-section">
        <h2 className="section-heading">Existing Programs</h2>
        {programs.length === 0 ? (
          <p className="programs-empty">No programs created yet.</p>
        ) : (
          <div className="program-tags">
            {programs.map(p => (
              <span key={p._id} className="program-tag">{p.name}</span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}