import baseService from './baseService';

export const getCartService = (userId) => {
    return baseService.get(`/cart/user/${userId}`)
}

export const addToCartService = (userCourse) => {
    return baseService.post(`/cart/user/new`, userCourse)
}

export const countCartService = (userId) => {
    return baseService.get(`/cart/count/${userId}`)
}

export const removeCartService = (userId, courseId) => {
    return baseService.delete(`cart/user/${userId}/course/${courseId}`)
}