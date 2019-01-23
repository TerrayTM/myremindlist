import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.to} activeClassName={classes.Active} exact={props.exact}>
            <span>
                {props.children}
            </span>
            {props.icon ? <span className={classes[props.icon]}></span> : null}
        </NavLink>
    </li>
);

export default navigationItem;