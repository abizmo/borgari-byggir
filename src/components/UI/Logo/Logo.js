import React from 'react';
import classes from './Logo.css';
import Logo from '../../../assets/imgs/burger-logo.png';

const logo = () => (
  <div className={ classes.Logo }>
    <img src={ Logo } alt="BorgariByggir"/>
  </div>
);

export default logo;
