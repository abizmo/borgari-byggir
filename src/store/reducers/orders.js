import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  ordering: false,
  purchased: false,
  loading: false
};

const purchaseInit = state => {
  return {
    ...state,
    purchased: false
  }
}
const purchaseBurgerStart = (state) => {
  return {
    ...state,
    ordering: true
  };
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };

  return {
    ...state,
    orders: state.orders.concat(newOrder),
    ordering: false,
    purchased: true
  };
};

const purchaseBurgerFail = (state, action) => {
  return {
    ...state,
    ordering: false
  };
};

const fetchOrdersStart = state => {
  return {
    ...state,
    loading: true
  };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false
  };
};

const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
