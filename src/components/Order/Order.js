import React from 'react';
import classes from './Order.css';

const order = props => {
  const ingredients = [];
  for (let ig in props.ingredients) {
    const ingredient = <span key={ig}>{ig} ({props.ingredients[ig]})</span>
    ingredients.push(ingredient)
  }
  return (
    <div className={ classes.Order }>
      <p>Ingredients: { ingredients }</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
