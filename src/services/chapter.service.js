import baseService from './baseService';

export const addChapterService = (chapter) => {
    
    return baseService.post(`/chapter/new`, chapter)
}

export const getChapterByCourse = (id) => {
    return baseService.get(`/chapter/course/${id}`)
}