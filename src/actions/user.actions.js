import * as services from '../services/user.service';
import * as types from '../constants/action.constants';

export const getUserAction = (id) => {
    return (dispatch) => {
        return services.getUserService(id).then(response => {
            if (response.status === 200)
                dispatch({
                    type: types.GET_USER_SUCCESS,
                    user: response.data
                })
        }).catch(err => {
            if (err.response)
                dispatch({
                    type: types.GET_USER_FAIL,
                    error: err.response.statusText
                })
        })
    }
}

export const editUserAction = (id, user, data) => {
    return (dispatch) => {
        return services.editUserService(id, data).then(response => {
            if (response.status === 200)
                dispatch({
                    type: types.EDIT_USER_SUCCESS,
                    image: response.data,
                    user
                })
        }).catch(err => {
            if (err.response)
                dispatch({
                    type: types.EDIT_USER_FAIL,
                    error: err.response.statusText
                })
        })
    }
}