import React, { Fragment } from 'react';

import classes from './ProfileArea.css';
import Button from '../UI/Button/Button';

const profileArea = (props) => {
    let emailAppend = null,
        phoneAppend = null;
        
    //eslint-disable-next-line
    if (props.verifyEmail == 0) {
        emailAppend = <span className={classes.NotVerified}> Not Verified</span>;
    }

    //eslint-disable-next-line
    if (props.verifyPhone == 0) {
        phoneAppend = <span className={classes.NotVerified}> Not Verified</span>;
    }

    return (
        <section className={classes.ProfileArea}>
            <div>
                <div className={classes.Profile}>i</div>
                <div className={classes.Text}>
                    <h1>Welcome {props.firstName + ' ' + props.lastName}!</h1>
                    <h4>Email: <Fragment>{props.email}{emailAppend}</Fragment></h4>
                    <h4>Phone: {props.phone ? <Fragment>{props.phone}{phoneAppend}</Fragment> : <span className={classes.AddNumber} onClick={props.addNumber}>Add Phone Number</span>}</h4>
                </div>
            </div>
            <div className={classes.CreateButton}>
                <Button type="Create" value="+" click={props.create}/>
                <p>Create New Remind</p>
            </div>
        </section>
    );
};

export default profileArea;