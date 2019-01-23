import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavigationBar from '../../Components/Navigation/NavigationBar/NavigationBar';
import Footer from '../../Components/Footer/Footer';
import SideBar from '../../Components/Navigation/SideBar/SideBar';

class Layout extends Component {
    state = {
        sideBarVisible: false
    }

    componentDidUpdate(previousProps) {
        if (previousProps.location.pathname !== this.props.location.pathname && this.state.sideBarVisible) {
            this.setState({ sideBarVisible: false });
        }
    }

    toggleSideBarHandler = () => {
        this.setState(previous => {
            return {
                sideBarVisible: !previous.sideBarVisible
            };
        });
    }

    render() {
        return (
            <Fragment>
                <NavigationBar sideBarMenuClick={this.toggleSideBarHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideBar show={this.state.sideBarVisible} close={this.toggleSideBarHandler} isAuthenticated={this.props.isAuthenticated}/>
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </Fragment>
        );
    }
}

const a = state => {
    return {
        isAuthenticated: state.token !== null
    };
}

export default withRouter(connect(a)(Layout));