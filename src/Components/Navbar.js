import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../Styles/NavBar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <Link className="brand-link" to="/" aria-label="Dynamic UI Builder home">
        <span className="brand-mark">D</span>
        <span>Dynamic UI Builder</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink className="nav-link" to="/create">Create</NavLink>
        <NavLink className="nav-link" to="/view">Sections</NavLink>
        <NavLink className="nav-link" to="/viewcombo">Templates</NavLink>
        <NavLink className="nav-link" to="/tempdataind">Data</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
