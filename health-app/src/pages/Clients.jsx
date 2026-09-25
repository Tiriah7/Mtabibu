import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';

export default function Clients() {
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="clients-page">
      <h1 className="page-heading">Clients</h1>
      <div className="clients-split">
        <div className="clients-split-left">
          <ClientForm onAdd={() => setTrigger(!trigger)} />
        </div>
        <div className="clients-split-right">
          <ClientList key={trigger} />
        </div>
      </div>
    </div>
  );
}