// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ borderBottom: '1px solid black', padding: '5px 0', marginBottom: '75px' }}>
      <h1 style={{ textAlign: 'center', margin: 0 }}>SHI-FU-MI Online</h1>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
          <li style={{ margin: '0 10px' }}><Link to="/login">Login</Link></li>
          <li style={{ margin: '0 10px' }}><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
