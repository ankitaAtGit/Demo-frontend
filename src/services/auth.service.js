import baseService from './baseService';

export const signInService = (user) => {
    return baseService.post('/user/sign-in', user);
}

export const signUpService = (user) => {
    return baseService.post('/user/sign-up', user);
}
