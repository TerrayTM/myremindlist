import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';
import Form from '../../Components/Form/Form';
import * as actions from '../../store/actions/account';
import classes from './Signup.css';
import ErrorHandler from '../../Components/ErrorHandler/ErrorHandler';

class Signup extends Component {
    state = {
        data: null
    }

    signupControls = [
        {
            type: 'input',
            name: 'firstName',
            label: 'First Name:',
            elementConfiguration: {
                type: 'text',
                placeholder: 'First Name'
            },
            validation: {
                required: true,
            }
        },
        {
            type: 'input',
            name: 'lastName',
            label: 'Last Name:',
            elementConfiguration: {
                type: 'text',
                placeholder: 'Last Name'
            },
            validation: {
                required: true,
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
            type: 'input',
            name: 'password',
            label: 'Password:',
            elementConfiguration: {
                type: 'password',
                placeholder: 'Password'
            },
            validation: {
                required: true,
                minLength: 6
            }
        },
        {
            type: 'input',
            name: 'passwordConfirm',
            label: 'Confirm Password:',
            elementConfiguration: {
                type: 'password',
                placeholder: 'Password'
            },
            validation: {
                required: true,
                minLength: 6
            }
        }
    ];
    
    submitHandler = (data) => {
        this.setState({ data });
        this.props.onSignup(data.email, data.password, data.firstName, data.lastName);
    }

    componentWillUnmount() {
        this.props.onResetError();
    }

    render() {
        let formArea = null;
        
        if (this.props.loading) {
            formArea = <Spinner/>;
        } else {
            formArea = (
                <Fragment>
                    <ErrorHandler error={this.props.error} resetError={this.props.onResetError}/>
                    <Form controls={this.signupControls} submitLabel="Signup" submit={this.submitHandler} data={this.state.data}/>
                    <Link to="/login">Switch to Login</Link>
                </Fragment>
            );
        }

        return (
            <div className={classes.Signup}>
                {this.props.isAuthenticated ? <Redirect to="/reminds"/> : null}
                <h2>Signup for MyRemindList</h2>
                <hr/>
                {formArea}
            </div>
        );
    }
}

const a = state => {
    return {
        loading: state.loading,
        isAuthenticated: state.token !== null,
        error: state.error
    };
}

const b = dispatch => {
    return {
        onSignup: (email, password, firstName, lastName) => dispatch(actions.createAccount(email, password, firstName, lastName)),
        onResetError: () => dispatch(actions.resetError())
    };
}

export default connect(a, b)(Signup);