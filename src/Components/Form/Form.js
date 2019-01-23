import React, { Component } from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Form.css';

class Form extends Component {
    persistDataValid = true;

    state = {
        controlData: this.props.controls.map(i => {
            let value;
            if (i.type !== 'select')
            {
                value = {
                    value: (() => {
                        if (this.props.data && this.props.data[i.name]) {
                            return this.props.data[i.name];
                        }
                        else {
                            this.persistDataValid = false;
                            return '';
                        }
                    })(),
                    valid: this.props.data && this.props.data[i.name],
                    touched: false,
                    name: i.name,
                    errorMessage: null
                };
            }
            else {
                value = {
                    value: (() => {
                        if (this.props.data && this.props.data[i.name]) {
                            return this.props.data[i.name];
                        }
                        else {
                            this.persistDataValid = false;
                            return i.elementConfiguration.options[0].value;
                        }
                    })(),
                    valid: true,
                    name: i.name
                };
            }
            return value;
        }),
        isFormValid: this.props.data && this.persistDataValid
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

    validateControlData = (value, rules) => {
        if (!rules) {
            return { valid: true, errorMessage: null };
        }
        let isValid = true,
            errorMessage = null;
        if (rules.required) {
            let test = value.trim() !== '';
            isValid = test && isValid;
            errorMessage = !test ? 'This field cannot be empty.' : errorMessage;
        }
        if (rules.minLength) {
            let test = value.length >= rules.minLength;
            isValid = test && isValid;
            errorMessage = !test ? 'Too few characters.' : errorMessage;
        }
        if (rules.maxLength) {
            let test = value.length <= rules.maxLength;
            isValid = test && isValid;
            errorMessage = !test ? 'Too many characters.' : errorMessage;
        }
        if (rules.minDate) {
            let test = new Date(value) >= new Date(rules.minDate);
            isValid = test && isValid;
            errorMessage = !test ? 'Date must be set in the future.' : errorMessage;
        }
        if (rules.phone) {
            let test = /^\d+$/.test(value);
            isValid = test && isValid;
            errorMessage = !test ? 'Invalid phone number.' : errorMessage;
        }
        if (rules.email) {
            //eslint-disable-next-line
            const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            let test = emailRegex.test(String(value).toLowerCase());
            isValid = test && isValid;
            errorMessage = !test ? 'Invalid email.' : errorMessage;
        }
        return { valid: isValid, errorMessage };
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {};
        this.state.controlData.forEach(i => {
            data[i.name] = i.value
        });
        this.props.submit(data);
    }

    onInputChange = (e, index) => {
        const copy = [...this.state.controlData];
        const controlData = { ...copy[index] };
        controlData.value = e.target.value;
        controlData.touched = true;
        const info = this.validateControlData(controlData.value, this.props.controls[index].validation);
        controlData.valid = info.valid;
        controlData.errorMessage = info.errorMessage;
        if (this.props.controls[index].name === 'passwordConfirm') {
            let test = controlData.value === this.state.controlData[index - 1].value;
            controlData.valid &= test;
            controlData.errorMessage = !test ? 'Passwords does not match.' : controlData.errorMessage;
        } else if (this.props.controls[index].name === 'password') {
            if (this.props.controls[index + 1] && this.props.controls[index + 1].name === 'passwordConfirm') {
                const confirm = { ...copy[index + 1] };
                let test = confirm.value === controlData.value;
                const info = this.validateControlData(confirm.value, this.props.controls[index + 1].validation);
                confirm.valid = info.valid && test;
                confirm.errorMessage = info.errorMessage;
                confirm.errorMessage = !test ? 'Passwords does not match.' : confirm.errorMessage;
                copy[index + 1] = confirm;
            }
        }
        copy[index] = controlData;

        let isFormValid = true;
        for (let i = 0; i < copy.length; ++i) {
            isFormValid = copy[i].valid && isFormValid;
        }

        this.setState({ controlData: copy, isFormValid });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    {this.props.controls.map((i, index) => {
                        return (
                            <Input 
                                type={i.type} 
                                change={(e) => this.onInputChange(e, index)} 
                                elementConfiguration={i.elementConfiguration} 
                                value={this.state.controlData[index].value}
                                label={i.label}
                                valid={this.state.controlData[index].valid}
                                touched={this.state.controlData[index].touched}
                                errorMessage={this.state.controlData[index].errorMessage}
                                key={index}
                            />
                        );
                    })}
                    <div className={classes.SubmitButton}>
                        <Button value={this.props.submitLabel} disabled={!this.state.isFormValid}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
