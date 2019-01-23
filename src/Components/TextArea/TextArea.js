import React from 'react';
import { Link } from 'react-router-dom';

import classes from './TextArea.css';

const textArea = () => (
    <section className={classes.TextArea}>
        <div>
            <h2>MyRemindList</h2>
            <hr/>
            <p><span>MyRemindList</span> is a free online service for setting reminders. What makes it unique is that you can manage your reminds from any device, such as your laptop. Simply create an account, confirm your email address, and start creating reminds!<br/><br/>
            Reminders can be sent via email or SMS to your phone. If you choose to receive reminds through text messages, please add and confirm your phone number under your profile.<br/><br/>
            Note that misusing this service for spam or any other acts that are deemed detrimental by us will terminate your access to the site as well as any future services.<br/><br/>
            This is a free platform and if it helped you in any way, please consider <Link to="/donate">donating</Link>. Your donation will go towards covering monthly site hosting fees and automated SMS bills.<br/><br/>
            </p>
        </div>
    </section>
);

export default textArea;