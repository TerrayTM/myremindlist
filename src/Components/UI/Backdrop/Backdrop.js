import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (
    <div className={[classes.Backdrop, props.show ? classes.Show : ''].join(' ')} onClick={props.click}></div>
);

export default backdrop;