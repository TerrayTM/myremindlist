import React from 'react';

import classes from './Feature.css';

const feature = (props) => (
    <div className={classes.Feature}>
        <img src={props.image} alt=""/>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
    </div>
);

export default feature;