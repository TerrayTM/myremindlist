import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button tabIndex={props.noTab ? -1 : null} className={[classes.Button, props.type ? classes[props.type] : ''].join(' ')} onClick={props.click} disabled={props.disabled}>{props.value}</button>
);

export default button;