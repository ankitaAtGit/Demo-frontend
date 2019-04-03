import baseService from './baseService';
import { config } from '../constants/config'

export const getUserService = (id) => {
    return baseService.get(`/user/get-user/${id}`)
}

export const editUserService = (id, user) => {
    return baseService.put(`user/edit/${id}`, user, config)
}