import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spinner } from '../../components/UI';
import Burger, { BuildControls, OrderSummary } from '../../components/Burger';
import { Aux, withErrorsHandler } from '../../utils';
import axios from '../../routes/orders';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import { setAuthRedirectPath } from '../../store/actions/auth';

class BurgerBuilder extends Component {
  constructor () {
    super();
    this.state = {
      purchasing: false
    }
  }

  componentDidMount () {
    this.props.initIngredientsHandler();
  }

  purchaseOrderHandler = () => {
    if (!this.props.isAuthenticated){
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    else
      this.setState({ purchasing: true });
  };

  cancelOrderHandler = () => {
    this.setState({ purchasing: false });
  };

  continueOrderHandler = () => {
    this.props.history.push('/checkout');
  };

  isPurchasable = ingredients => {
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey])
      .reduce((total, el) => total + el, 0);
    return sum > 0;
  }

  render () {
    const disabledControls = { ...this.props.ingredients };
    for (const key in disabledControls) {
      disabledControls[key] = disabledControls[key] === 0;
    }

    let burger = <Spinner />;
    let ordering = null;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger
            ingredients = { this.props.ingredients }/>
          <BuildControls
            ingredients = { this.props.ingredients }
            removeIngredient = { this.props.removeIngredientHandler }
            addIngredient = { this.props.addIngredientHandler }
            disabledControls= { disabledControls }
            price = { this.props.totalPrice }
            purchasable = { this.isPurchasable(this.props.ingredients) }
            ordered = { this.purchaseOrderHandler }
            isLogged = { this.props.isAuthenticated }/>
        </Aux>
      );
      ordering = <OrderSummary
        ingredients={ this.props.ingredients }
        cancel={ this.cancelOrderHandler }
        continue={ this.continueOrderHandler }
        price={ this.props.totalPrice }/>;
    }


    return (
      <Aux>
        <Modal display={ this.state.purchasing } closeModal={ this.cancelOrderHandler }>
          { ordering }
        </Modal>
        { this.props.error ? <p>Ingredients can't be loaded!</p> : burger }
      </Aux>
    )
  }
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
    error: state.burgerBuilder.order,
    isAuthenticated: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: ingredient => dispatch(burgerBuilderActions.addIngredient(ingredient)),
    removeIngredientHandler: ingredient => dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    initIngredientsHandler: () => dispatch(burgerBuilderActions.initIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorsHandler(BurgerBuilder, axios));
