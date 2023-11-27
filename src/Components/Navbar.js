// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-links">
        <Link className="link" to="/create">Create</Link>
        <Link className="link" to="/view">Sections</Link>
      </div>
      <div className="right-links">
        <Link className='link' to="/viewcombo">Templates</Link>
        <Link className='link' to="/tempdataind">Data</Link>
      </div>
    </div>
  );
}

export default Navbar;
