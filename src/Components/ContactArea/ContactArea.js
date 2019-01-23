import React from 'react';

import Form from '../Form/Form';
import classes from './ContactArea.css';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Spinner from '../UI/Spinner/Spinner';
import Success from '../../assets/images/check.png';

const contactControls = [
    {
        type: 'input',
        name: 'name',
        label: 'Name:',
        elementConfiguration: {
            type: 'text',
            placeholder: 'Name'
        },
        validation: {
            required: true
        }
    },
    {
        type: 'input',
        name: 'email',
        label: 'Email:',
        elementConfiguration: {
            type: 'text',
            placeholder: 'Email'
        },
        validation: {
            required: true,
            email: true
        }
    },
    {
        type: 'textarea',
        name: 'message',
        label: 'Message:',
        elementConfiguration: {
            placeholder: 'Message'
        },
        validation: {
            required: true,
            maxLength: 1024
        }
    }
];

const contactArea = (props) => {
    let element = <Form controls={contactControls} submit={props.submit} submitLabel="Submit"/>;

    if (props.success) {
        element = (
            <div className={classes.Success}>
                <img src={Success} alt="Success" onClick={props.close}/>
                <p>Thank you for your message! We will get back to you as soon as possible.</p>
            </div>
        );
    } else if (props.loading) {
        element = <Spinner/>;
    }
    
    return (
        <section className={classes.ContactArea}>
            <div>
                <h2>Contact Us</h2>
                <hr/>
                {props.error ? <ErrorHandler error={props.error} resetError={props.reset}/> : null}
                {element}
            </div>
        </section>
    );
};

export default contactArea;