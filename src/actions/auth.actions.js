import * as userServices from '../services/auth.service';
import * as types from '../constants/action.constants';

export const signInAction = (user) => {
    return (dispatch) => {
        return userServices.signInService(user).then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.user.token)
                localStorage.setItem('id', response.data.user.id)
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    token: response.data.user.token,
                    id: response.data.user.id
                })
            }
        }).catch(err => {
            dispatch({
                type: types.LOGIN_FAIL,
                error: err.response.data
            })
        })
    }
}

export const signUpAction = (user) => {
    return (dispatch) => {
        return userServices.signUpService(user).then(response => {
            if (response.status === 200) {
                localStorage.setItem('id', response.data.user.id)
                dispatch({
                    type: types.SIGN_UP_SUCCESS
                })
            }
        }).catch(err => {
            dispatch({
                type: types.SIGN_UP_FAIL,
                error: err.response.data
            })
        })
    }
}

export const signOutAction = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        dispatch({
            type: types.LOGOUT
        })
    }
}