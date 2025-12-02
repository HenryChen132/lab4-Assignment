// client/components/Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContext';
import apiBase from '../src/apiBase';

export default function Layout() {

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
    
      await fetch(`${apiBase}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
   
      setUser(null);
      navigate('/');
    }
  };

  return (
    <>
      <i
        style={{
          float: 'left',
          textDecoration: 'underline',
          color: 'lightblue',
        }}
      >
        Student name: HaoxuanChen
      </i>
      <i
        style={{
          float: 'right',
          textDecoration: 'underline',
          color: 'lightblue',
        }}
      >
        Student ID: 301420628
      </i>

      <div
        style={{
          clear: 'both',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <img
          src="/Logo.png"
          alt="logo"
          style={{ width: '80px', height: '80px' }}
        />
        <h1 style={{ textAlign: 'center' }}>Portfolio</h1>
      </div>

      <hr />

      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About Me</Link> |{' '}
        <Link to="/education">Education</Link> |{' '}
        <Link to="/project">Project</Link> | <Link to="/services">Services</Link> |{' '}
        <Link to="/contact">Contact Me</Link>
      </nav>

      <div style={{ marginTop: '10px' }}>
        {user ? (
          <>
            <span style={{ marginRight: '10px', color: 'lightblue' }}>
              Logged in as {user.name}{' '}
              {user.role === 'admin' && <b>(Admin)</b>}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link> |{' '}
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </>
  );
}
