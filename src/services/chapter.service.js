import baseService from './baseService';

export const addChapterService = (chapter) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.post(`/chapter/new`, chapter, config)
}

export const getChapterByCourse = (id) => {
    return baseService.get(`/chapter/course/${id}`)
}

export const deleteChapterService = (id) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.delete(`/chapter/${id}`, config)
}

export const deleteFileService = (file, id) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.delete(`/chapter/id/${id}/file/${file}`, config)
}