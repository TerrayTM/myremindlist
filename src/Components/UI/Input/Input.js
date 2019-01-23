import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.type) {
        case 'input':
        inputElement = <input onChange={props.change} className={inputClasses.join(' ')} {...props.elementConfiguration} value={props.value}/>;
        break;
        case 'textarea':
        inputElement = <textarea onChange={props.change} className={inputClasses.join(' ')} {...props.elementConfiguration} value={props.value}/>;
        break;
        case 'select':
        inputElement = (
            <select onChange={props.change} className={inputClasses.join(' ')} value={props.value}>
                {props.elementConfiguration.options.map(i => {
                    return <option key={i.value} value={i.value}>{i.display}</option>
                })}
            </select>
        );
        break;
        default:
        break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {props.errorMessage && props.touched ? <p>{props.errorMessage}</p> : null}
        </div>
    );
};

export default input;