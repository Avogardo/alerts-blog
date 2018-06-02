import React from 'react';
import Button from '@material-ui/core/Button';
import './MainLayout.css';

const MainLayout = () => (
  <div>
    <header>
      <img alt="logo" src="https://drive.google.com/uc?id=1U_HEoR8c2kubf6-JsbHEcwo564J5zjlE" />
      <h1>Alarms blog</h1>
    </header>

    <Button variant="raised" color="secondary">
      Hello World
    </Button>
  </div>
);

export default MainLayout;
