import React from 'react';
import classes from './Toolbar.css';
import { Logo } from '../../UI';
import { NavigationItems, DrawerToggle } from '../../Navigation';

const toolbar = (props) => {
  return (
    <header className={ classes.Toolbar }>
      <DrawerToggle clicked={ props.drawerToggleClicked }/>
      <div className={ classes.Logo }>
        <Logo />
      </div>
      <nav className={ classes.DesktopOnly }>
        <NavigationItems isLogged={ props.isLogged }/>
      </nav>
    </header>
  );
};

export default toolbar;
