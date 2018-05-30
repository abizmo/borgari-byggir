import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Aux } from '../../utils';
import { SideDrawer, Toolbar } from '../Navigation';
import classes from './Layout.css';

class Layout extends Component {
  constructor (props) {
    super (props);
    this.state = {
      showSideDrawer: false
    };
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  drawerToggleClicked = () => {
      this.setState(prevState => {
        return { showSideDrawer: !prevState.showSideDrawer };
      });
  };

  render () {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={ this.drawerToggleClicked } 
          isLogged={ this.props.isAuthenticated }/>
        <SideDrawer
          display={ this.state.showSideDrawer }
          closed={ this.closeSideDrawer }
          isLogged={ this.props.isAuthenticated }/>
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </Aux>
    );
  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

export default connect(mapStateToProps) (Layout);
