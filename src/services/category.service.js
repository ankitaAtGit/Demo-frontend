import baseService from './baseService';

export const getCategoriesService = () => {
    return baseService.get('/category/all/categories');
}
