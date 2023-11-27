

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/NavOtherComp.css'; // Import your CSS file

const NavBarOtherComp = () => {
  return (
    <div className="navbarrr">
      <div className="left-links">
        <NavLink className="link" to="/" exact activeClassName="active-link">
          🏠 Home
        </NavLink>
      </div>
      <div className="right-links">
        <NavLink className='link' to="/viewcombo" activeClassName="active-link">
          Templates
        </NavLink>
        <NavLink className='link' to="/tempdataind" activeClassName="active-link">
          Saved Data
        </NavLink>
      </div>
    </div>
  );
}

export default NavBarOtherComp;

