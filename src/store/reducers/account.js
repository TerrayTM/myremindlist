import * as actionTypes from '../actions/actionTypes';

const apply = (state, newState) => {
    return {
        ...state,
        ...newState
    };
}

const initalState = {
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    verifyEmail: null,
    verifyPhone: null,
    reminds: null,
    loading: false,
    error: null,
    complete: null
};

const deleteRemind = (state, id) => {
    const copy = [ ...state.reminds ];
    for (let i = 0; i < copy.length; ++i) {
        if (copy[i].id === id) {
            copy.splice(i, 1);
            break;
        }
    }
    return apply(state, { reminds: copy, complete: true, loading: false, error: null });
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_LOGIN: return apply(state, { loading: true, error: null });
        case actionTypes.ACCOUNT_LOGIN_SUCCESS: return apply(state, { loading: false, error: null, token: action.token, email: action.email, phone: action.phone, firstName: action.firstName, lastName: action.lastName, reminds: action.reminds, verifyEmail: action.verifyEmail, verifyPhone: action.verifyPhone });
        case actionTypes.ACCOUNT_LOGOUT: return initalState;
        case actionTypes.CREATE_ACCOUNT: return apply(state, { loading: true, error: null });
        case actionTypes.CREATE_ACCOUNT_SUCCESS: return apply(state, { loading: false, error: null, token: action.token, email: action.email, firstName: action.firstName, lastName: action.lastName, verifyEmail: action.verifyEmail, verifyPhone: action.verifyPhone });
        case actionTypes.DELETE_REMIND: return apply(state, { loading: true, error: null });
        case actionTypes.DELETE_REMIND_SUCCESS: return deleteRemind(state, action.id);
        case actionTypes.CREATE_REMIND: return apply(state, { loading: true, error: null });
        case actionTypes.CREATE_REMIND_SUCCESS: return apply(state, { complete: true, loading: false, error: null, reminds: (state.reminds || []).concat(action.remind) });
        case actionTypes.SET_ERROR: return apply(state, { loading: false, error: action.error });
        case actionTypes.RESET_ERROR: return apply(state, { error: null });
        case actionTypes.RESET_COMPLETE: return apply(state, { complete: null });
        case actionTypes.VERIFY: return apply(state, { loading: true, error: null });
        case actionTypes.VERIFY_SUCCESS: return apply(state, { loading: false, error: null, [action.verifyType]: '1' });
        case actionTypes.ADD_PHONE: return apply(state, { loading: true, error: null });
        case actionTypes.ADD_PHONE_SUCCESS: return apply(state, { loading: false, error: null, phone: action.phone, complete: true });
        default: return state;
    }
}

export default reducer;