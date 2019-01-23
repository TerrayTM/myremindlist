import React from 'react';

import Remind from '../Remind/Remind';
import classes from './Reminds.css';

const reminds = (props) => {
    let padding = Array(props.reminds.length % 4).fill(0);

    return (
        <section className={classes.Reminds}>
            <div>
                <h2>{props.archive ? 'Archived Reminders' : 'Active Reminders'}</h2>
                <hr/>
                <div className={classes.Container}>
                    {props.reminds.length === 0 ? props.archive ? <span>No archived reminders!</span> : <span onClick={props.create} className={classes.Create}>No active reminders! Create one now!</span> : props.reminds.map(i => {
                        return <Remind message={i.message} time={i.time} params={i.params} delete={() => props.delete(i.id)} key={i.id}/>
                    })}
                    {padding.map((i, index) => {
                        return <div className={classes.Extra} key={index}></div>;
                    })}
                </div>
            </div>
        </section>
    ); 
};

export default reminds;