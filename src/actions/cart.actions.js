import * as types from '../constants/action.constants'
import * as services from '../services/cart.service'

export const addToCartAction = (userCourse) => {
    return (dispatch) => {
        return services.addToCartService(userCourse).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.ADD_TO_CART_SUCCESS,
                    cart: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.ADD_TO_CART_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}

export const getCartAction = (userId) => {
    return (dispatch) => {
        return services.getCartService(userId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_CART_SUCCESS,
                    cart: response.data.cart,
                    courseData: response.data.courseData
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.GET_CART_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}

export const countCartAction = (userId) => {
    return (dispatch) => {
        return services.countCartService(userId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.COUNT_CART_SUCCESS,
                    count: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.COUNT_CART_FAIL,
                    error: err.response.data
                })
            }
        })
    }
}

export const removeCartAction = (userId, courseId) => {
    return (dispatch) => {
        return services.removeCartService(userId, courseId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.REMOVE_CART_SUCCESS,
                    id: courseId
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.REMOVE_CART_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}