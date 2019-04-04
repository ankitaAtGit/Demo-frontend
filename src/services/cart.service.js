import baseService from './baseService';

export const getCartService = (userId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.get(`/cart/user/${userId}`, config)
}

export const addToCartService = (userCourse) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.post(`/cart/user/new`, userCourse, config)
}

export const countCartService = (userId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.get(`/cart/count/${userId}`, config)
}

export const removeCartService = (userId, courseId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.delete(`cart/user/${userId}/course/${courseId}`, config)
}