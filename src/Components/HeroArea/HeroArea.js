import React from 'react';

import classes from './HeroArea.css';
import Button from '../UI/Button/Button';

const heroArea = (props) => (
    <section className={classes.HeroArea}>
        <div>
            <h1>Send email and SMS reminders!</h1>
            <h3>Simple yet powerful. Never forget things again.</h3>
            <Button value={props.message} click={props.redirect} type="SignupButton"/>
        </div>
    </section>
);

export default heroArea;