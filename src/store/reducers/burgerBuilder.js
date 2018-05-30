import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.6,
  meat: 1.3
};

const initialState = {
  ingredients: null,
  price: 3,
  order: false,
  building: false
};

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredient]: state.ingredients[action.ingredient] + 1
    },
    price: state.price + INGREDIENT_PRICE[action.ingredient],
    building: true
  };
};

const removeIngredient = (state, action) => {
  if (!state.ingredients[action.ingredient])
    return state;
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredient]: state.ingredients[action.ingredient] - 1
    },
    price: state.price - INGREDIENT_PRICE[action.ingredient],
    building: true
  };
};

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      salad: action.ingredients['salad'],
      bacon: action.ingredients['bacon'],
      cheese: action.ingredients['cheese'],
      meat: action.ingredients['meat'],
    },
    price: initialState.price,
    error: false,
    building: false
  };
};

const initIngredientsFailed = state => {
  return {
    ...state,
    error: true
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient (state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.INIT_INGREDIENTS_FAILED: return initIngredientsFailed(state);
    default: return state;
  }
};

export default reducer;
