import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/account';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/"/>;
    }
}

const b = dispatch => {
    return {
        onLogout: () => dispatch(actions.accountLogout())
    };
}

export default connect(null, b)(Logout);