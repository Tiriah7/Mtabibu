import { useState, useEffect } from 'react';
import API from '../api';

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
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const addProgram = async () => {
    try {
      const res = await API.post('/programs', { name });
      setPrograms([...programs, res.data]);
      setName('');
    } catch (err) {
      console.error("Failed to add program:", err);
      setError("Failed to add program");
    }
  };

  const enrollClient = async () => {
    try {
      await API.post('/clients/enroll', {
        clientId: selectedClient,
        programId: selectedProgram,
      });
      alert('Client enrolled successfully!');
    } catch (err) {
      console.error("Enrollment failed:", err);
      setError("Failed to enroll client");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Create Program</h2>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Program name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addProgram}>
          Add
        </button>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Enroll Client to Program</h2>
      <div className="flex flex-col gap-2 mb-4">
        <select
          className="border p-2"
          value={selectedClient}
          onChange={e => setSelectedClient(e.target.value)}
        >
          <option value="">Select Client</option>
          {clients.map(c => (
            <option key={c._id} value={c._id}>
              {c.name} (Age: {c.age})
            </option>
          ))}
        </select>

        <select
          className="border p-2"
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
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={enrollClient}
          disabled={!selectedClient || !selectedProgram}
        >
          Enroll
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <h3 className="font-semibold mt-4">Existing Programs:</h3>
      <ul className="list-disc list-inside">
        {programs.map(p => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
