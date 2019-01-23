import React, { Fragment } from 'react';

import Backdrop from '../UI/Backdrop/Backdrop';
import Form from '../Form/Form';
import classes from './Dialog.css';
import Spinner from '../UI/Spinner/Spinner';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

const dialog = (props) => (
    <Fragment>
        <Backdrop show={props.show} click={()=> { if (props.cancel) { props.cancel(); props.reset(); } }}/>
        <div className={[classes.Dialog, props.show ? classes.Show : ''].join(' ')}>
            <div className={classes.Header}>
                <h3>{props.header}</h3>
                {props.static ? <div className={classes.PlaceHolder}>&times;</div> : <div className={classes.Cancel} onClick={()=> { if (props.cancel) { props.cancel(); props.reset(); } }}>&times;</div>}
            </div>
            <ErrorHandler error={props.error} resetError={props.reset}/>
            {props.loading ? <Spinner/> : <Form submitLabel={props.submitLabel} controls={props.controls} data={props.data} submit={props.submit}/>}
            {props.loading ? null : props.children}
        </div>
    </Fragment>
);

export default dialog;