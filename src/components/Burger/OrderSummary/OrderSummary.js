import React from 'react';
import { Aux } from '../../../utils';
import classes from './OrderSummary.css';
import { Button } from '../../../components/UI';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey =>(
    <li key={ igKey }>
      <span style={{ textTransform: 'capitalize' }}>
        { igKey }:
      </span> { props.ingredients[igKey] }
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul className={ classes.Summary }>
        { ingredientSummary }
      </ul>
      <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button type="Danger" clicked={ props.cancel }>CANCEL</Button>
      <Button type="Success" clicked={ props.continue }>CONTINUE</Button>
    </Aux>
  )
};

export default orderSummary;
