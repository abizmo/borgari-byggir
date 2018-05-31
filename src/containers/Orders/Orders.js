import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order';
import axios from '../../routes/orders';
import { Spinner } from '../../components/UI';
import { withErrorsHandler } from '../../utils';
import { fetchOrders } from '../../store/actions/orders';

class Orders extends Component {

  componentDidMount () {
    this.props.onFetchOrders(this.props.idToken, this.props.userId);
  };

  render () {
    const orders = this.props.loading ?
      <Spinner /> :
      this.props.orders.map(order =>
        <Order key={order.id} ingredients={ order.ingredients } price={ +order.price }/>
    );

    return (
      <div>
        { orders }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    idToken: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (idToken, userId) => dispatch(fetchOrders(idToken, userId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorsHandler(Orders, axios));
