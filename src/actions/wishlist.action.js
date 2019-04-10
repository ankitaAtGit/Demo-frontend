import * as types from '../constants/action.constants';
import * as services from '../services/wishlist.service';

export const getWishlistAction = (userId) => {
    return (dispatch) => {
        return services.getWishlistService(userId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_WISHLIST_SUCCESS,
                    wishlist: response.data.wishlist,
                    courseData: response.data.courseData
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.GET_WISHLIST_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}

export const addWishlistAction = (wishlist) => {
    return (dispatch) => {
        return services.addToWishListService(wishlist).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.ADD_WISHLIST_SUCCESS,
                    wishlist: response.data.wishlist,
                    courseData: response.data.courseData
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.ADD_WISHLIST_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}

export const removeWishlistAction = (userId, courseId) => {
    return (dispatch) => {
        return services.removeFromWishlistService(userId, courseId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.REMOVE_WISHLIST_SUCCESS,
                    courseId
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.REMOVE_WISHLIST_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}