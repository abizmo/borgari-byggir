import React from 'react';
import classes from './Input.css';

const input = props => {
  let element;

  switch (props.inputType) {
    case 'input':
      element = <input
        { ...props.config }
        value={props.value}
        onChange={ props.onChange }
        onBlur={ props.onBlur }/>
      break;
    case 'select':
      element = (
        <select name={ props.name } value={props.value} onChange={props.onChange}>
          { props.config.options.map(opt =>
            <option
              value={ opt.value }
              key={opt.value}>{ opt.display }</option>)}
        </select>
      )
      break;
    default:
      element = <input type="text"/>
  }

  let classesSet = [classes.Input];
  if (props.message)
    classesSet.push(classes.invalid);
  return (
    <div className={classesSet.join(' ')}>
      <label>{ props.name}</label>
      {
        props.message ?
        <span>{props.message}</span> : null
      }
      { element }
    </div>
  );
};

export default input;
