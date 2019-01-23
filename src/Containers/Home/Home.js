import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import HeroArea from '../../Components/HeroArea/HeroArea';
import ContactArea from '../../Components/ContactArea/ContactArea';
import FeatureArea from '../../Components/FeatureArea/FeatureArea';
import TextArea from '../../Components/TextArea/TextArea';

class Home extends Component {
    state = {
        error: null,
        loading: false,
        success: false
    }

    submitHandler = (data) => {
        this.setState({ loading: true, error: null, success: false });
        const content = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
            })
        }
        fetch('***', content).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                this.setState({ loading: false, error: 'NETWORK ERROR' });
            }
        }).then(response => {
            if (response.error) {
                this.setState({ loading: false, error: response.error });
            }
            else {
                this.setState({ loading: false, error: null, success: true });
            }
        }).catch(error => {
            this.setState({ loading: false, error });
        });
    }

    signupButtonClickHandler = () => {
        if (this.props.isAuthenticated) {
            this.props.history.push('/reminds');
        }
        else {
            this.props.history.push('/signup');
        }
    }

    render() {
        return (
            <Fragment>
                <HeroArea redirect={this.signupButtonClickHandler} message={this.props.isAuthenticated ? 'Go to Reminds' : 'Signup for Free'}/>
                <FeatureArea/>
                <TextArea/>
                <ContactArea 
                    submit={this.submitHandler} 
                    error={this.state.error} 
                    loading={this.state.loading} 
                    reset={() => this.setState({ error: null })}
                    close={() => this.setState({ success: false })}
                    success={this.state.success}
                />
            </Fragment>
        );
    }
}

const a = state => {
    return {
        isAuthenticated: state.token !== null
    };
}

export default connect(a)(Home);