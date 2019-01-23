import React, { Component } from 'react';

import Button from '../../Components/UI/Button/Button';
import classes from './Donate.css';

class Donate extends Component {
    render() {
        return (
            <div className={classes.Donate}>
                <section>
                    <h1>We accept donations through PayPal!</h1>
                </section>
                <section className={classes.TextArea}>
                    <div>
                        <h2>If you enjoyed our service, consider donating to keep it alive!</h2>
                        <hr/>
                        <p>Your donation will go towards covering monthly hosting fees, text message bills, and some coffee for us while we do maintenance on the server or website.</p>
                        <Button value="Donate via PayPal ❤️" type="Donate" click={() => window.location = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=V9PA4UGW67SYG&lc=CA&item_name=TerryTM&no_note=1&no_shipping=1&currency_code=CAD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted'}/>
                    </div>
                </section>
            </div>
        );
    }
}

export default Donate;