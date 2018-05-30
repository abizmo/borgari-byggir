import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.css';

class BuildControl extends Component {
  render () {
    return (
      <div className={classes.BuildControl}>
        <span className={classes.Label}>{this.props.label}</span>
        <button
          className={classes.Remove}
          onClick={this.props.remove}
          disabled={this.props.disabled}>Remove</button>
        <button
          className={classes.Add}
          onClick={this.props.add}>Add</button>
      </div>
    );
  };
}

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default BuildControl;
