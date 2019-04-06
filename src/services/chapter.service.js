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

export const deleteFileService = (id) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.delete(`/file/${id}`, config)
}

export const editChapterService = (id, chapter) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.put(`chapter/${id}`, chapter, config)
}