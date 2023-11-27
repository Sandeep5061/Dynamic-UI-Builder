// NavBarForData.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/NavBarForData.css'; // Import your CSS file

const NavBarForData = () => {
  return (
    <div className="navbar-for-data">
      <div className="left-links">
        <NavLink className="link" to="/" exact activeClassName="active-link">
          🏠 Home
        </NavLink>
        
      </div>
      <div className="right-links">
        <NavLink className='link' to="/create" activeClassName="active-link">
          Create
        </NavLink>
        <NavLink className='link' to="/viewcombo" activeClassName="active-link">
          Templates
        </NavLink>
      </div>
    </div>
  );
}
{/* <Link className='link' to="/viewcombo">Templates</Link> */}

export default NavBarForData;
