import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Containers/Layout/Layout';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import Logout from './Containers/Logout/Logout';
import * as actions from './store/actions/account';
import Reminders from './Containers/Reminders/Reminders';
import Donate from './Containers/Donate/Donate';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    return (
      <Layout>
        <Switch>
          {this.props.isAuthenticated ? <Route path="/logout" component={Logout}/> : null}
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/reminds" component={Reminders}/>
          <Route path="/donate" component={Donate}/>
          <Route path="/" exact component={Home}/>
          <Redirect to="/"/>
        </Switch>
      </Layout>
    );
  }
}

const a = state => {
  return {
    isAuthenticated: state.token !== null
  };
}

const b = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin())
  };
}

export default withRouter(connect(a, b)(App));