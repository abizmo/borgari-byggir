import React from 'react';
import { Logo, Backdrop } from '../../UI';
import { NavigationItems } from '../../Navigation';
import { Aux } from '../../../utils';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
  let classname = [classes.SideDrawer, classes.Close];
  if (props.display)
    classname = [classes.SideDrawer, classes.Open];
  return (
    <Aux>
      <Backdrop display={ props.display } closed={ props.closed }/>
      <div className={ classname.join(" ") }>
        <div className={ classes.Logo }>
          <Logo />
        </div>
        <nav>
          <NavigationItems isLogged={ props.isLogged }/>
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
