import React from 'react';

import classes from './Remind.css';
import Button from '../UI/Button/Button';

const addDateSuffix = (d) => {
    if (d > 3 && d < 21) {
        return d + 'th';
    }
    switch (d % 10) {
    case 1:
        return d + 'st';
    case 2:
        return d + 'nd';
    case 3:
        return d + 'rd';
    default:
        return d + 'th';
    }
};

const formatTime = (h, m) => {
    let isPM = false;
    if (h > 12) {
        h -= 12;
        isPM = true;
    }
    return h + ':' + m.toString().padStart(2, '0') + (isPM ? ' PM' : ' AM');
};

const remind = (props) => {
    let date = new Date(parseInt(props.time, 10) * 1000),
        time = formatTime(date.getHours(), date.getMinutes());
    date = ' ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()] + ' ' + addDateSuffix(date.getDate()) + ', ' + date.getFullYear();

    return (
        <div className={[classes.Remind, props.params.includes('sms') ? classes.SMS : ''].join(' ')}>
            <p>{time}<span>{date}</span></p>
            <p className={classes.Message}>{props.message.length > 160 ? props.message.substring(0, 160) + '...' : props.message}</p>
            <div className={classes.Toolbar}>
                <Button value="Delete" type="Delete" click={props.delete} noTab/>
            </div>
        </div>
    );
};

export default remind;