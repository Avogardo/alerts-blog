import React from 'react';

import CupcakeIpsum from './CupcakeIpsum.jsx';

import './MainContent.css';

const MainContent = ({ style, toggleDrawer }) => (
  <div className="MainContent" style={{ ...style }}>
    <div className="MainContent-navbar">
      <button onClick={toggleDrawer}>Button</button>
      <h1 className="MainContent-navbar-title">React Swipeable Drawer</h1>
    </div>
    <CupcakeIpsum />
  </div>
);

export default MainContent;
