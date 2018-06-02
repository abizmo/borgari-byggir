import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import { BurgerBuilder, Logout } from './containers';
import { tryAutoAuthentication } from './store/actions/auth';
import { asyncComponent } from './utils';

const Checkout = asyncComponent(() => import('./containers/Checkout'));
const Orders = asyncComponent(() => import('./containers/Orders'));
const Auth = asyncComponent(() => import('./containers/Auth'));

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoAuthentication();
  };

  render() {
    return (
      <div>
        <Layout>
          {
            this.props.isLogged ?
            <Switch>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Route render={ () => <Redirect to={this.props.authRedirectPath} /> } />
            </Switch> :
            <Switch>
              <Route path="/auth" component={Auth}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Route render={ () => <Redirect to="/" /> } />
            </Switch>
          }
        </Layout>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isLogged: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoAuthentication: () => dispatch(tryAutoAuthentication())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
