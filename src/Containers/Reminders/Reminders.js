import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Reminds from '../../Components/Reminds/Reminds';
import ProfileArea from '../../Components/ProfileArea/ProfileArea';
import * as actions from '../../store/actions/account';
import Dialog from '../../Components/Dialog/Dialog';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Reminders extends Component {
    state = {
        dialog: 0,
        deleteID: null
    }

    componentDidMount() {
        if (!this.props.token && !localStorage.getItem('token')) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.token && !localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        if (this.props.complete) {
            this.props.onResetComplete();
            this.setState({ dialog: 0 });
        }
    }

    componentWillUnmount() {
        this.props.onResetError();
    }

    getCurrentDate = () => {
        let today = new Date(),
         dd = today.getDate(),
         mm = today.getMonth() + 1,
         yyyy = today.getFullYear();

        if(dd < 10) {
            dd = '0' + dd;
        } 

        if(mm < 10) {
            mm = '0' + mm;
        } 

        return yyyy + '-' + mm + '-' + dd;
    }

    createControls = [
        {
            type: 'input',
            name: 'date',
            label: 'Scheduled Date:',
            elementConfiguration: {
                type: 'date'
            },
            validation: {
                required: true,
                minDate: this.getCurrentDate()
            }
        },
        {
            type: 'input',
            name: 'time',
            label: 'Scheduled Time:',
            elementConfiguration: {
                type: 'time'
            },
            validation: {
                required: true
            }
        },
        {
            type: 'select',
            name: 'method',
            label: 'Remind Method:',
            elementConfiguration: {
                type: 'text',
                options: [
                    { value: 'email', display: 'Email' },
                    { value: 'sms', display: 'SMS' }
                ]
            },
            validation: {
                required: true
            }
        },
        {
            type: 'textarea',
            name: 'message',
            label: 'Message:',
            elementConfiguration: {
                type: 'text',
                placeholder: '256 Character Limit'
            },
            validation: {
                required: true,
                maxLength: 256
            }
        }
    ];

    deleteControls = [
        {
            type: 'label',
            name: 'confirm',
            label: 'Are you sure you want to delete this reminder?'
        }
    ];

    verifyControls = [
        {
            type: 'input',
            name: 'code',
            label: 'Please check your email for a verification code:',
            elementConfiguration: {
                type: 'text',
                placeholder: '6 Digit Verification Code'
            },
            validation: {
                required: true,
                maxLength: 6,
                minLength: 6
            }
        }
    ];

    addPhoneControls = [
        {
            type: 'input',
            name: 'phone',
            label: 'SMS Capable Phone Number:',
            elementConfiguration: {
                type: 'text',
                placeholder: '10 Digit Phone Number'
            },
            validation: {
                required: true,
                maxLength: 10,
                minLength: 10,
                phone: true
            }
        }
    ];

    deleteHandler = (id) => {
        if (!id) {
            return;
        }
        this.props.onDeleteRemind(id, this.props.token);
    }

    createHandler = (data) => {
        let browser = navigator.userAgent.toLowerCase(),
            calculatedTime = Date.parse(data.date + 'T' + data.time);

        if (browser.indexOf('safari') !== -1) {
            if (browser.indexOf('chrome') <= -1) {
                calculatedTime = Date.parse(data.date + 'T' + data.time + 'Z'); 
            }
        }
        
        this.props.onCreateRemind(this.props.token, data.message, Math.floor(calculatedTime / 1000), 'active ' + data.method);
    }

    cancelHandler = () => {
        if (!this.props.loading) {
            this.setState({ dialog: 0, deleteID: null });
        }
    }

    showCreateDialogHandler = () => {
        this.setState({ dialog: 1 });
    }

    showDeleteDialogHandler = (id) => {
        this.setState({ dialog: 2, deleteID: id });
    }

    showAddNumberDialogHandler = () => {
        this.setState({ dialog: 3 });
    }

    verificationHandler = (data) => {
        //eslint-disable-next-line
        this.props.onVerify(this.props.token, data.code, this.props.verifyEmail == '0' ? 'verifyEmail' : 'verifyPhone');
    }

    addNumberHandler = (data) => {
        this.props.onAddPhone(this.props.token, data.phone);
    }

    render() {
        let active = [], archived = [], body = null;

        if (this.props.reminds && this.props.reminds.length > 0) {
            active = this.props.reminds.filter(i => i.params.includes('active'));
            archived = this.props.reminds.filter(i => i.params.includes('archived'));
        }

        //eslint-disable-next-line
        if (this.props.verifyEmail == '1') {
            this.verifyControls[0].label = 'Please check your phone for a verification code:';
        }

        if (!this.props.firstName) {
            body = <Spinner/>;
        } else {
            body = (
                <Fragment>
                    <ProfileArea 
                        addNumber={this.showAddNumberDialogHandler} 
                        create={this.showCreateDialogHandler} 
                        firstName={this.props.firstName || ''} 
                        lastName={this.props.lastName || ''} 
                        email={this.props.email || ''} 
                        phone={this.props.phone || ''}
                        verifyEmail={this.props.verifyEmail}
                        verifyPhone={this.props.verifyPhone}
                    />
                    <Reminds reminds={active} delete={this.showDeleteDialogHandler} create={this.showCreateDialogHandler}/>
                    <Reminds reminds={archived} delete={this.showDeleteDialogHandler} archive/>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Dialog 
                    loading={this.props.loading} 
                    submit={this.createHandler} 
                    data={{time: ((new Date().getHours() + 1) % 24).toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0'), date: this.getCurrentDate()}} 
                    header="Create New Remind" 
                    controls={this.createControls} 
                    submitLabel="Create" 
                    cancel={this.cancelHandler} 
                    show={this.state.dialog === 1}
                    error={this.props.error}
                    reset={this.props.onResetError}
                />
                <Dialog 
                    loading={this.props.loading} 
                    submit={() => this.deleteHandler(this.state.deleteID)} 
                    data={{confirm: true}}
                    header="Confirm Delete" 
                    controls={this.deleteControls} 
                    submitLabel="Confirm" 
                    cancel={this.cancelHandler} 
                    show={this.state.dialog === 2}
                    error={this.props.error}
                    reset={this.props.onResetError}
                />
                <Dialog 
                    loading={this.props.loading} 
                    submit={this.verificationHandler} 
                    //eslint-disable-next-line
                    header={this.props.verifyEmail == '0' ? "Verify Email" : "Verify Phone"}
                    controls={this.verifyControls} 
                    submitLabel="Verify"
                    //eslint-disable-next-line
                    show={this.props.verifyEmail == '0' || (this.props.verifyPhone == '0' && this.props.phone)}
                    error={this.props.error}
                    reset={this.props.onResetError}
                    static
                />
                <Dialog 
                    loading={this.props.loading} 
                    submit={this.addNumberHandler} 
                    header="Add Phone Number" 
                    controls={this.addPhoneControls} 
                    submitLabel="Confirm" 
                    cancel={this.cancelHandler} 
                    show={this.state.dialog === 3}
                    error={this.props.error}
                    reset={this.props.onResetError}
                />
                {body}
            </Fragment>
        );
    }
}

const a = state => {
    return {
        email: state.email,
        phone: state.phone,
        verifyEmail: state.verifyEmail,
        verifyPhone: state.verifyPhone,
        firstName: state.firstName,
        lastName: state.lastName,
        reminds: state.reminds,
        token: state.token,
        loading: state.loading,
        error: state.error,
        complete: state.complete
    };
}

const b = dispatch => {
    return {
        onDeleteRemind: (id, token) => dispatch(actions.deleteRemind(id, token)),
        onCreateRemind: (token, message, time, params) => dispatch(actions.createRemind(token, message, time, params)),
        onResetError: () => dispatch(actions.resetError()),
        onResetComplete: () => dispatch(actions.resetComplete()),
        onVerify: (token, code, verifyType) => dispatch(actions.verify(token, code, verifyType)),
        onAddPhone: (token, phone) => dispatch(actions.addPhone(token, phone))
    };
}

export default connect(a, b)(Reminders);