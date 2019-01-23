import React, { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideBar.css';
import Button from '../../UI/Button/Button';

const sideBar = (props) => (
    <Fragment>
        <Backdrop show={props.show} click={props.close}/>
        <div className={[props.show ? classes.Show : '', classes.SideBar].join(' ')}>
            <div className={classes.Header}>
                <Logo/>
                <Button value="&times;" click={props.close} type="MenuClose"/>
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated} sideBar/>
            </nav>
        </div>
    </Fragment>
);

export default sideBar;