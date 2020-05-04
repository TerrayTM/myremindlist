import * as actionTypes from './actionTypes';
import { api } from '../../config';

export const accountLogin = (email, password) => {
    return (dispatch) => {
        dispatch(accountLoginBegin());
        const content = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        };
        fetch(api, content).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            else {
                dispatch(setError('NETWORK_ERROR'));
            }
        }).then(response => {
            if (response.error) {
                dispatch(setError(response.error));
            }
            else {
                localStorage.setItem('token', response.token);
                localStorage.setItem('expiry', new Date(new Date().getTime() + response.expiry * 1000));
                dispatch(accountLoginSuccess(response.token, response.firstName, response.lastName, email, response.phone, response.reminds, response.verifyEmail, response.verifyPhone));
                dispatch(autoLogout(response.expiry));
            }
        }).catch(error => {
            dispatch(setError('NETWORK_ERROR'));
        });
    };
}

export const accountLoginBegin = () => {
    return {
        type: actionTypes.ACCOUNT_LOGIN
    };
}

export const accountLoginSuccess = (token, firstName, lastName, email, phone, reminds, verifyEmail, verifyPhone) => {
    return {
        type: actionTypes.ACCOUNT_LOGIN_SUCCESS,
        token,
        firstName,
        lastName,
        email,
        phone,
        reminds,
        verifyEmail,
        verifyPhone
    };
}

export const accountLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    return {
        type: actionTypes.ACCOUNT_LOGOUT
    };
}

export const createAccount = (email, password, firstName, lastName) => {
    return dispatch => {
        dispatch(createAccountBegin());
        const content = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName
            })
        }
        fetch(api, content).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                dispatch(setError('NETWORK_ERROR'));
            }
        }).then(response => {
            if (response.error) {
                dispatch(setError(response.error));
            }
            else {
                localStorage.setItem('token', response.token);
                localStorage.setItem('expiry', new Date(new Date().getTime() + response.expiry * 1000));
                dispatch(createAccountSuccess(response.token, email, firstName, lastName, response.verifyEmail, response.verifyPhone));
                dispatch(autoLogout(response.expiry));
            }
        }).catch(error => {
            dispatch(setError(error));
        });
    };
}

export const createAccountBegin = () => {
    return {
        type: actionTypes.CREATE_ACCOUNT
    };
}

export const createAccountSuccess = (token, email, firstName, lastName, verifyEmail, verifyPhone) => {
    return {
        type: actionTypes.CREATE_ACCOUNT_SUCCESS,
        token,
        email,
        firstName,
        lastName,
        verifyEmail,
        verifyPhone
    };
}

export const tryAutoLogin = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        let expiry = localStorage.getItem('expiry');

        if (token && expiry) {
            if (new Date(expiry) > new Date()) {
                fetch(`${api}?token=${token}`).then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        dispatch(accountLogout());
                    }
                }).then(response => {
                    if (response.error) {
                        dispatch(accountLogout());
                    } 
                    else {
                        expiry = (new Date(expiry).getTime() - new Date().getTime()) / 1000;
                        dispatch(accountLoginSuccess(token, response.firstName, response.lastName, response.email, response.phone, response.reminds, response.verifyEmail, response.verifyPhone));
                        dispatch(autoLogout(expiry));
                    }
                }).catch(error => {
                    dispatch(accountLogout());
                });
            } 
            else {
                dispatch(accountLogout());
            }
        }
    };
}

export const deleteRemindBegin = () => {
    return {
        type: actionTypes.DELETE_REMIND
    };
}

export const deleteRemind = (id, token) => {
    return dispatch => {
        dispatch(deleteRemindBegin());
        const content = {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                id
            })
        }
        fetch(api, content).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                dispatch(setError('NETWORK_ERROR'));
            }
        }).then(response => {
            if (response.error) {
                dispatch(setError(response.error));
            }
            else {
                dispatch(deleteRemindSuccess(id));
            }
        }).catch(error => {
            dispatch(setError(error));
        });
    };
}

export const deleteRemindSuccess = (id) => {
    return {
        type: actionTypes.DELETE_REMIND_SUCCESS,
        id
    };
}

export const createRemind = (token, message, time, params) => {
    return dispatch => {
        dispatch(createRemindBegin());
        const content = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                message,
                time,
                params
            })
        }
        fetch(api, content).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                dispatch(setError('NETWORK_ERROR'));
            }
        }).then(response => {
            if (response.error) {
                dispatch(setError(response.error));
            }
            else {
                dispatch(createRemindSuccess({ id: response.id, message, time, params }));
            }
        }).catch(error => {
            dispatch(setError(error));
        });
    };
}

export const createRemindBegin = () => {
    return {
        type: actionTypes.CREATE_REMIND
    };
}

export const createRemindSuccess = (remind) => {
    return {
        type: actionTypes.CREATE_REMIND_SUCCESS,
        remind
    };
}

export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        error
    };
}

export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR
    };
}

export const resetComplete = () => {
    return {
        type: actionTypes.RESET_COMPLETE
    };
}

export const autoLogout = (expiry) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(accountLogout());
        }, expiry * 1000);
    };
}

export const verifyBegin = () => {
    return {
        type: actionTypes.VERIFY
    };
}

export const verify = (token, code, verifyType) => {
    return dispatch => {
        dispatch(verifyBegin());
        const content = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                code
            })
        }
        fetch(api, content).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                dispatch(setError('NETWORK_ERROR'));
            }
        }).then(response => {
            if (response.error) {
                dispatch(setError(response.error));
            }
            else {
                dispatch(verifySuccess(verifyType));
            }
        }).catch(error => {
            dispatch(setError(error));
        });
    };
};

export const verifySuccess = (verifyType) => {
    return {
        type: actionTypes.VERIFY_SUCCESS,
        verifyType
    };
}

export const addPhone = (token, phone) => {
    return dispatch => {
        dispatch(addPhoneBegin());
        const content = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                phone
            })
        }
        fetch(api, content).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                dispatch(setError('NETWORK_ERROR'));
            }
        }).then(response => {
            if (response.error) {
                dispatch(setError(response.error));
            }
            else {
                dispatch(addPhoneSuccess(phone));
            }
        }).catch(error => {
            dispatch(setError(error));
        });
    };
}

export const addPhoneBegin = () => {
    return {
        type: actionTypes.ADD_PHONE
    };
}

export const addPhoneSuccess = (phone) => {
    return {
        type: actionTypes.ADD_PHONE_SUCCESS,
        phone
    };
}