import React from 'react';
import Ingredient from './BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const ingredients = Object.keys(props.ingredients)
      .map(ingredient => [...Array(props.ingredients[ingredient])]
        .map((_, i) => <Ingredient key={ingredient + i} ingredient={ingredient} />))
      .reduce((arr, ele) => arr.concat(ele), []);

    return (
      <div className={ classes.Burger }>
        <Ingredient ingredient="bread-top" />
        { ingredients.length > 0 ?
            ingredients :
            <p>Please start adding ingredients!</p>
        }
        <Ingredient ingredient="bread-bottom" />
      </div>
    );
};

export default burger;
