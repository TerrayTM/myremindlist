import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';
import Form from '../../Components/Form/Form';
import * as actions from '../../store/actions/account';
import classes from './Login.css';
import ErrorHandler from '../../Components/ErrorHandler/ErrorHandler';

class Login extends Component {
    state = {
        data: null
    }

    loginControls = [
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
        }
    ];
    
    submitHandler = (data) => {
        this.setState({ data });
        this.props.onLogin(data.email, data.password);
    }

    componentWillUnmount() {
        this.props.onResetError();
    }

    render() {
        let formArea = null;
        
        if (this.props.loading) {
            formArea = <Spinner/>;
        } 
        else {
            formArea = (
                <Fragment>
                    <ErrorHandler error={this.props.error} resetError={this.props.onResetError}/>
                    <Form controls={this.loginControls} submitLabel="Login" submit={this.submitHandler} data={this.state.data}/>
                    <Link to="/signup">Create an Account</Link>
                </Fragment>
            );
        }

        return (
            <div className={classes.Login}>
                {this.props.isAuthenticated ? <Redirect to="/reminds"/> : null}
                <h2>Login to MyRemindList</h2>
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
        onLogin: (email, password) => dispatch(actions.accountLogin(email, password)),
        onResetError: () => dispatch(actions.resetError())
    };
}

export default connect(a, b)(Login);