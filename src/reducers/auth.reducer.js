import * as types from '../constants/action.constants';

const initState = {
    id: '',
    token: '',
    signUpError: '',
    signInError: '',
    user: {
        user: {},
        error: ''
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, { token: action.token, id: action.id, signInError: '' })
        case types.LOGIN_FAIL:
            return Object.assign({}, state, { signInError: action.error, token: '', id: '' })
        case types.LOGOUT:
            return Object.assign({}, state, { token: '', signInError: '', id: '' })
        case types.GET_USER_SUCCESS:
            return Object.assign({}, state, { user: { error: '', user: { ...action.user } } })
        case types.GET_USER_FAIL:
            return Object.assign({}, state, { user: { error: action.error } })
        case types.SIGN_UP_SUCCESS:
            return Object.assign({}, state, { id: action.id, signUpError: '' })
        case types.SIGN_UP_FAIL:
            return Object.assign({}, state, { signUpError: action.error, id: '' })
        case types.EDIT_USER_SUCCESS:
            let editUser = { ...state.user.user };
            editUser.firstName = action.user.firstName
            editUser.lastName = action.user.lastName
            editUser.picture = action.image;
            return Object.assign({}, state, { user: { user: { ...editUser } } })
        case types.EDIT_USER_FAIL:
            return Object.assign({}, state, { user: { ...state.user, error: action.error } })
        default: return state
    }
}