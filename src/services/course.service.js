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
    return baseService.post(`/course/new/course`, course)
}

export const getCourseById = (id) => {
    return baseService.get(`/course/details/${id}`)
}

export const subscribeCourse = (data) => {
    return baseService.post(`/sub/course-user/new`, data);
}

export const getSubscribeCourses = (id) => {
    return baseService.get(`/sub/course-user/all/user/course/${id}`);
}

export const editCourseService = (id, course) => {
    return baseService.put(`/course/edit/course/${id}`, course);
}

export const deleteCourseService = (id) => {
    return baseService.delete(`/course/delete/${id}`);
}

export const rateCourseService = (id, rating) => {
    return baseService.put(`/sub/course-user/rate/${id}`, rating);
}

export const searchCourseService = (query) => {
    return baseService.get(`/course/search/${query}`)
}