import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl';

const buildControls = (props) => {
  const controls = [
    { label: 'Meat', ingredient: 'meat' },
    { label: 'Cheese', ingredient: 'cheese' },
    { label: 'Salad', ingredient: 'salad' },
    { label: 'Bacon', ingredient: 'bacon' },
  ];

  return (
    <div className={ classes.BuildControls }>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      { controls.map(ctrl =>
          <BuildControl
            ingredient={ ctrl.ingredient }
            label={ ctrl.label }
            key={ ctrl.label }
            remove={ () => props.removeIngredient(ctrl.ingredient)}
            add={ () => props.addIngredient(ctrl.ingredient)}
            disabled={ props.disabledControls[ctrl.ingredient]}
          />)
      }
      <button
        className={ classes.OrderButton }
        onClick={ props.ordered }
        disabled={ !props.purchasable }>
        {
          props.isLogged ?
          "ORDER NOW" :
          "SIGN IN"
        }
      </button>
    </div>
  );
};

export default buildControls;
