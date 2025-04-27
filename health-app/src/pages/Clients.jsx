import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';

export default function Clients() {
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Clients</h1>
      <ClientForm onAdd={() => setTrigger(!trigger)} />
      <hr className="my-4" />
      <ClientList key={trigger} />
    </div>
  );
}
