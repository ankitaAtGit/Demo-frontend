import baseService from './baseService';

export const addChapterService = (chapter) => {
    return baseService.post(`/chapter/new`, chapter)
}

export const getChapterByCourse = (id) => {
    return baseService.get(`/chapter/course/${id}`)
}

export const deleteChapterService = (id) => {
    return baseService.delete(`/chapter/${id}`)
}

export const deleteFileService = (file, id) => {
    return baseService.delete(`/chapter/id/${id}/file/${file}`)
}