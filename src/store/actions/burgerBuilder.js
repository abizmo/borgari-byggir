import axios from '../../routes/orders';
import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient
  };
};

export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const initIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => dispatch(setIngredients(res.data)))
      .catch(err => dispatch(initIngredientsFailed()));
  };
};
