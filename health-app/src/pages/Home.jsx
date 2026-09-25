import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import '../App.css';

export default function Home() {
  const [stats, setStats] = useState({ clients: null, programs: null });

  useEffect(() => {
    Promise.all([API.get('/clients'), API.get('/programs')])
      .then(([clientsRes, programsRes]) => {
        setStats({
          clients: clientsRes.data.length,
          programs: programsRes.data.length,
        });
      })
      .catch(() => setStats({ clients: '—', programs: '—' }));
  }, []);

  return (
    <div className="home-wrapper">

      {/* Hero */}
      <section className="home-hero">
        <h1 className="home-hero-title">Mtabibu Health Information System</h1>
        <p className="home-hero-subtitle">
          Register clients, manage health programs, and track enrollments —
          all in one place.
        </p>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="home-stat-card">
          <span className="home-stat-number">
            {stats.clients === null ? '…' : stats.clients}
          </span>
          <span className="home-stat-label">Registered Clients</span>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-number">
            {stats.programs === null ? '…' : stats.programs}
          </span>
          <span className="home-stat-label">Active Programs</span>
        </div>
      </section>

      {/* Quick actions */}
      <section className="home-actions">
        <Link to="/clients" className="home-action-card">
          <span className="home-action-icon">🧑‍⚕️</span>
          <h3>Manage Clients</h3>
          <p>Register new clients and browse existing client profiles.</p>
        </Link>

        <Link to="/programs" className="home-action-card">
          <span className="home-action-icon">🩺</span>
          <h3>Manage Programs</h3>
          <p>Create health programs and enroll clients into them.</p>
        </Link>
      </section>

    </div>
  );
}