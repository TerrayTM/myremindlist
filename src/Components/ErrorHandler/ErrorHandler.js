import React from 'react';

import classes from './ErrorHandler.css'

const errorHandler = (props) => {
    let renderItems = null;

    if (props.error) {
        let message = null;
        switch (props.error) {
            case 'INCORRECT_EMAIL_OR_PASSWORD':
            message = 'Incorrect email or password.';
            break;
            case 'EMAIL_EXISTS':
            message = 'This email is already used.';
            break;
            case 'INVALID_CODE':
            message = 'Invalid verification code.';
            break;
            case 'BAD_EMAIL':
            message = 'Please use another email.';
            break;
            case 'NOT_VERIFIED_EMAIL':
            message = 'You need to verify your email.';
            break;
            case 'NOT_VERIFIED_PHONE':
            message = 'You need to add and verify your phone.';
            break;
            default:
            message = 'An unknown error has occurred.';
            break;
        }

        renderItems = (
            <div className={classes.ErrorHandler}>
                <p>{message}</p>
                <div onClick={props.resetError}>&times;</div>
            </div>
        );
    }
    
    return renderItems;
};

export default errorHandler;