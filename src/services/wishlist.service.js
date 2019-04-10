import baseService from './baseService';

export const getWishlistService = (userId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.get(`/wishlist/${userId}`, config)
}

export const addToWishListService = (wishlist) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.post(`/wishlist/new`, wishlist, config)
}

export const removeFromWishlistService = (userId, courseId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.delete(`/wishlist/user/${userId}/course/${courseId}`, config)
}