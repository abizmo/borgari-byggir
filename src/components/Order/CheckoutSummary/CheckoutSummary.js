import React from 'react';
import classes from './CheckoutSummary.css';
import { Button } from '../../UI';
import Burger from '../../Burger';

const checkoutSummary = props => {
  return (
    <div className={ classes.CheckoutSummary }>
      <h1>This is your burger</h1>
      <Burger ingredients = { props.ingredients }/>
      <div className={ classes.Buttons }>
        <Button type="Danger" clicked={props.cancelledOrder}>CANCEL</Button>
        <Button type="Success" clicked={props.continuedOrder}>CONTINUE</Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
