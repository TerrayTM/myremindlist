import React from 'react';

import classes from './Logo.css';
import Logo from '../../assets/images/logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={Logo} alt="Logo"/>
        <h3>MyRemindList</h3>
    </div>
);

export default logo;