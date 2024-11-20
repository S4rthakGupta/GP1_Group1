import React from 'react';
import { Link } from 'react-router-dom';

// Importing CSS for the Navbar Component
import "../style/Navbar.css"; 

// Creating a Navbar with two links and adding a title name which brings to home page when clicked.
const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <Link className="navbar-brand" to="/">Employee Management System</Link>
      <div className="navbar-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/create">Add Employee</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
