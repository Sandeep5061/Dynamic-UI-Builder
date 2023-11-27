import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

const headerStyle = {
  backgroundColor: 'rgb(108, 161, 173)', // Your desired background color
  padding: '10px',
  textAlign: 'center',
  color: '#fff', // Text color
}

const titleStyle = {
  margin: '0',
}

export default Header;


