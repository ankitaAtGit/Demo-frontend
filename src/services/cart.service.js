import baseService from './baseService';

export const getCartService = (userId) => {
    return baseService.get(`/cart/user/${userId}`)
}

export const addToCartService = (userCourse) => {
    return baseService.post(`/cart/user/new`, userCourse)
}