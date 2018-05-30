import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { CheckoutSummary } from '../../components/Order';
import ContactData from './ContactData';
import { purchaseInit } from '../../store/actions/orders';

class Checkout extends Component {
  componentWillMount = () => {
    this.props.onPurchaseInit();
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summary = <Redirect to='/'/>;
    if (this.props.ingredients)
      summary = (
        <div>
          { this.props.purchased ? <Redirect to='/'/> : null }
          <CheckoutSummary
            ingredients={ this.props.ingredients }
            cancelledOrder={ this.checkoutCancelHandler }
            continuedOrder={ this.checkoutContinueHandler }
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={ (props) => <ContactData {...props } />} />
        </div>
      );

    return summary;
  }
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.orders.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: () => dispatch(purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
