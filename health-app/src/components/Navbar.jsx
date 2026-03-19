import { Link, useLocation } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const { pathname } = useLocation();

  const navLinks = [
    { to: '/',         label: 'Home'     },
    { to: '/clients',  label: 'Clients'  },
    { to: '/programs', label: 'Programs' },
  ];

  return (
    <nav style={{ background: 'linear-gradient(135deg, #1a7a6e 0%, #145f55 100%)', padding: '0 1.5rem' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: '1.45rem',
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '-.01em',
        }}>
          Mtabibu System
        </h1>

        <ul style={{ display: 'flex', gap: '.5rem', listStyle: 'none' }}>
          {navLinks.map(({ to, label }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to));
            return (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    display: 'block',
                    padding: '.4rem .85rem',
                    borderRadius: '6px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '.85rem',
                    fontWeight: active ? 600 : 500,
                    letterSpacing: '.04em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: active ? '#fff' : 'rgba(255,255,255,.75)',
                    background: active ? 'rgba(255,255,255,.15)' : 'transparent',
                    transition: '200ms',
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}