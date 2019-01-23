import React, { Fragment } from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let links = (
        <Fragment>
            <NavigationItem to="/" exact>Home</NavigationItem>
            <NavigationItem to="/donate">Donate</NavigationItem>
            <NavigationItem to="/login">Login</NavigationItem>
            <NavigationItem to="/signup">Signup</NavigationItem>
        </Fragment>
    );

    if (props.isAuthenticated) {
        links = (
            <Fragment>
                <NavigationItem to="/" exact>Home</NavigationItem>
                <NavigationItem to="/donate">Donate</NavigationItem>
                <NavigationItem to="/reminds">Reminds</NavigationItem>
                <NavigationItem to="/logout" icon="Logout">Logout</NavigationItem>
            </Fragment>
        );
    }

    return (
        <ul className={[classes.NavigationItems, props.sideBar ? classes.Stable : ''].join(' ')}>
            {links}
        </ul>
    );
};

export default navigationItems;