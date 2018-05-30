import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
  <div className={ classes.Spinner }>
    <div className={ classes.Rect1 }></div>
    <div className={ classes.Rect2 }></div>
    <div className={ classes.Rect3 }></div>
    <div className={ classes.Rect4 }></div>
    <div className={ classes.Rect5 }></div>
  </div>
);

export default spinner;
