import baseService from './baseService';

export const getCourseByCatId = (id) => {
    return baseService.get(`/course/category/courses/${id}`);
}

export const getCourseByUserId = (id) => {
    return baseService.get(`/course/user/courses/${id}`)
}

export const getAllCourses = () => {
    return baseService.get(`/course/all/courses`)
}

export const createCourseService = (course) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.post(`/course/new/course`, course, config)
}

export const getCourseById = (id) => {
    return baseService.get(`/course/details/${id}`)
}

export const subscribeCourse = (data) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.post(`/sub/course-user/new`, data, config);
}

export const getSubscribeCourses = (id) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.get(`/sub/course-user/all/user/course/${id}`, config);
}

export const editCourseService = (id, course) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.put(`/course/edit/course/${id}`, course, config);
}

export const deleteCourseService = (id) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.delete(`/course/delete/${id}`, config);
}

export const rateCourseService = (id, rating) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    return baseService.put(`/sub/course-user/rate/${id}`, rating, config);
}