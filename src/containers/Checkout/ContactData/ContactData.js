import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Spinner, Input } from '../../../components/UI';
import { Aux, withErrorsHandler, checkValidity } from '../../../utils';
import classes from './ContactData.css';
import axios from '../../../routes/orders';
import * as ordersActions from '../../../store/actions/orders';

class ContactData extends Component {
  state = {
    elements: {
      name: {
        value: "",
        inputType: "input",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        config: {
          type: "text",
          placeholder: "Your name..."
        }
      },
      email: {
        value: "",
        inputType: "input",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        config: {
          type: "email",
          placeholder: "Your email..."
        }
      },
      street: {
        value: "",
        inputType: "input",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        config: {
          type: "text",
          placeholder: "Your street..."
        }
      },
      zipCode: {
        value: "",
        inputType: "input",
        validation: {
          required: true,
          length: {
            min: 5,
            max: 6
          }
        },
        valid: false,
        touched: false,
        config: {
          type: "text",
          placeholder: "Your zip code..."
        }
      },
      country: {
        value: "",
        inputType: "input",
        valid: true,
        touched: false,
        config: {
          type: "text",
          placeholder: "Your country..."
        }
      },
      deliveryMethod: {
        value: "free",
        inputType: "select",
        valid: true,
        touched: false,
        config: {
          options: [
            {
              value: 'fastest',
              display: 'Fastest'
            }, {
              value: 'free',
              display: 'Free'
            }
          ]
        }
      }
    }
  }

  orderedHandler = e => {
    e.preventDefault();
    this.setState({
      ordering: true
    });
    const { name,
      email,
      street,
      zipCode,
      country,
      deliveryMethod } = this.state.elements;

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      customer: {
        name: name.value,
        email: email.value,
        userId: this.props.userId,
        address: {
          street: street.value,
          zipCode: zipCode.value,
          country: country.value
        }
      },
      deliveryMethod: deliveryMethod.value
    };

    this.props.onPurchaseBurger(order, this.props.idToken);
  }

  inputChangeHandler = (e, elementId) => {
    const elements = {...this.state.elements};
    const element = elements[elementId];
    element.value = e.target.value;
    element.valid = checkValidity(element);
    this.setState({ elements });
  }

  inputBlurHandler = (elementId) => {
    const elements = {...this.state.elements};
    elements[elementId].touched = true;
    this.setState({ elements });
  }

  render () {
    let inputs = [];
    let validForm = true;

    for (let key in this.state.elements) {
      const element = {...this.state.elements[key]};
      inputs.push({
        id: key,
        inputType: element.inputType,
        config: element.config,
        value: element.value,
        message: !element.valid && element.touched ? "Please fill this field correctly!" : null
      })
      validForm = element.valid && validForm;
    }

    const form = this.props.ordering ?
      <Spinner /> :
      <Aux>
        <h3>Please complete the form</h3>
        <form onSubmit={ this.orderedHandler }>
          { inputs.map(input =>
              <Input
                value={input.value}
                key={input.id}
                config={input.config}
                inputType={input.inputType}
                message={input.message}
                onBlur={ () => this.inputBlurHandler(input.id)}
                onChange={(e) => this.inputChangeHandler(e, input.id)}/>) }
          <Button type="Success" disabled={ !validForm }>ORDER</Button>
        </form>
      </Aux>

    return (
      <div className={ classes.ContactData }>
        { form }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.price,
    ordering: state.orders.ordering,
    idToken: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData, idToken) => dispatch(ordersActions.purchaseBurger(orderData, idToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorsHandler(ContactData, axios));
