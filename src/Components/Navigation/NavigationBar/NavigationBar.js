import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './NavigationBar.css';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button/Button';

const navigationBar = (props) => (
    <header className={classes.NavigationBar}>
        <Button value="☰" type="Menu" click={props.sideBarMenuClick}/>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
    </header>
);

export default navigationBar;