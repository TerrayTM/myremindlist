import React from 'react';

import Feature from '../Feature/Feature';
import classes from './FeatureArea.css';
import Simple from '../../assets/images/simple.png';
import Accessible from '../../assets/images/accessible.png';
import Flexible from '../../assets/images/flexible.png';

const featureArea = () => (
    <section className={classes.FeatureArea}>
        <div>
            <Feature image={Simple} title="Simple" text="Set up reminds in less than 30 seconds!"/>
            <Feature image={Accessible} title="Accessible" text="Set and view your reminds anywhere!"/>
            <Feature image={Flexible} title="Flexible" text="Choose between Email or SMS reminds!"/>
        </div>
    </section>
);

export default featureArea;