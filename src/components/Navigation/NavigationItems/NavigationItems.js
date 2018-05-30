import React from 'react';
import NavigationItem from './NavigationItem';
import classes from './NavigationItems.css';
import { Aux } from '../../../utils';

const navigationItems = (props) => {
  const logged = props.isLogged ?
    <Aux>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </Aux> :
    <NavigationItem link="/auth">Authenticate</NavigationItem>;
  return (
    <ul className={ classes.NavigationItems }>
      <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
      { logged }
    </ul>
  );
};

export default navigationItems;
