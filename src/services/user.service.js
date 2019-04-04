import baseService from './baseService';

export const getUserService = (id) => {
    return baseService.get(`/user/get-user/${id}`)
}

export const editUserService = (id, user) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.put(`user/edit/${id}`, user, config)
}