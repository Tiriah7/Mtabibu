import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';

export default function ClientProfile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [, setPrograms] = useState([]);


  useEffect(() => {
    API.get(`/clients/${id}`).then(res => setClient(res.data));
    API.get('/programs').then(res => setPrograms(res.data));
  }, [id]);


  if (!client) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{client.name}'s Profile</h2>
      <p className="text-gray-600 mb-4">Age: {client.age} | Gender: {client.gender}</p>
  
      <h3 className="text-xl font-semibold">Enrolled Programs:</h3>
      <ul className="list-disc list-inside mb-4">
        {client.programs.length === 0 ? (
          <li>No enrolled programs</li>
        ) : (
          client.programs.map(p => <li key={p._id}>{p.name}</li>)
        )}
      </ul>
  
    </div>
  );
  
}
