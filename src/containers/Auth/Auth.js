import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Aux, checkValidity } from '../../utils';
import { Button, Input, Spinner } from '../../components/UI';
import classes from './Auth.css';
import { auth, setAuthRedirectPath } from '../../store/actions/auth';

class Auth extends Component {
  state = {
    elements: {
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
      password: {
        value: "",
        inputType: "input",
        validation: {
          required: true,
          length: {
            min: 8
          }
        },
        valid: false,
        touched: false,
        config: {
          type: "password",
          placeholder: "Your password..."
        }
      }
    },
    isSingUp: true
  };

  submitHandler = e => {
    e.preventDefault();
    const email = this.state.elements.email.value;
    const pwd = this.state.elements.password.value;
    this.props.onAuth(email, pwd, this.state.isSingUp);
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

  clickHandler = () => {
    this.setState(prevState => ({ isSingUp: !prevState.isSingUp}));
  }

  componentDidMount () {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
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

    const form = (
      <Aux>
        <h3>Please complete the form</h3>
        {
          this.props.error ?
          <p>{ this.props.error.response.data.error.message }</p> :
          null
        }
        <form onSubmit={ this.submitHandler }>
          { inputs.map(input =>
              <Input
                value={input.value}
                key={input.id}
                config={input.config}
                inputType={input.inputType}
                message={input.message}
                onBlur={ () => this.inputBlurHandler(input.id)}
                onChange={(e) => this.inputChangeHandler(e, input.id)}/>) }
          <Button type="Success" disabled={ !validForm }>
            {
              this.state.isSingUp ?
              "SIGN UP" : "SIGN IN"
            }
          </Button>
        </form>
        <Button type="Info" clicked={ this.clickHandler }>
          {
            this.state.isSingUp ?
            "SWICH TO SIGN IN" : " SWITCH TO SIGN UP"
          }
        </Button>
      </Aux>
    );

    return (
      <div className={ classes.Auth }>
        {
          this.props.loading ?
          <Spinner /> : form
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pwd, isSingUp) => dispatch(auth(email, pwd, isSingUp)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
