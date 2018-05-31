import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { BurgerBuilder, Checkout, Orders, Auth, Logout } from './containers';
import { tryAutoAuthentication } from './store/actions/auth';
import { Aux } from './utils';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoAuthentication();
  };
  // TODO: Corregir la path de /auth que no deberia de aparecer en el
  // primer grupo. Pero si no no redirige a BurgerBuilder
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {
              this.props.isLogged ?
              <Aux>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={BurgerBuilder}/>
              </Aux> :
              <Aux>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={BurgerBuilder}/>
              </Aux>
            }
          </Switch>
        </Layout>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isLogged: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoAuthentication: () => dispatch(tryAutoAuthentication())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
