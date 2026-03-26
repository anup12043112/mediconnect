import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const Navbar = () => {
  // User ki state store karne ke liye
  const [user, setUser] = useState(null);

  // Google Sign In Function
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("Logged in user:", result.user.displayName);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>MediConnect</h1>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/doctors" className="nav-link">Find Doctors</Link></li>
        <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
      </ul>
      
      {/* Agar user login hai toh uski photo aur Logout button dikhao, warna Login button */}
      <div className="auth-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user ? (
          <>
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #2563eb' }}
            />
            <span style={{ fontWeight: '500', color: '#334155' }}>{user.displayName.split(' ')[0]}</span>
            <button className="btn-primary" onClick={handleLogout} style={{ backgroundColor: '#ef4444' }}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={handleLogin}>
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;