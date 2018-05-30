import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop  from '../Backdrop';
import { Aux } from '../../../utils';

class Modal extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.display !== this.props.display || nextProps.children !== this.props.children;
  };

  render () {
    const style = {
      transform: this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.display ? 1 : 0
    };

    return (
      <Aux>
        <Backdrop
          display={ this.props.display }
          closed={ this.props.closeModal } />
        <div className={ classes.Modal } style={ style }>
          { this.props.children }
        </div>
      </Aux>
    );
  };
};

export default Modal;
