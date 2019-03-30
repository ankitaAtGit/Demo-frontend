import * as services from '../services/course.service';
import * as types from '../constants/action.constants';

export const getCourseByCatId = (id) => {
    return (dispatch) => {
        return services.getCourseByCatId(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_COURSES_SUCCESS,
                    courses: response.data
                })
            }
        }).catch(err => {
            if (err.response)
                dispatch({
                    type: types.GET_COURSES_FAIL,
                    error: err.response.statusText
                })
        })
    }
}

export const getCourseByUserId = (id) => {
    return (dispatch) => {
        return services.getCourseByUserId(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_USER_COURSES_SUCCESS,
                    courses: response.data
                })
            }
        }).catch(err => {
            if (err.response)
                dispatch({
                    type: types.GET_USER_COURSES_FAIL,
                    error: err.response.statusText
                })
        })
    }
}

export const getAllCourses = (id) => {
    return (dispatch) => {
        return services.getAllCourses().then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_ALL_COURSES_SUCCESS,
                    courses: response.data
                })
            }
        }).catch(err => {
            if (err.response)
                dispatch({
                    type: types.GET_ALL_COURSES_FAIL,
                    error: err.response.statusText
                })
        })
    }
}

export const createCourseAction = (course) => {
    return (dispatch) => {
        return services.createCourseService(course).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.CREATE_COURSE_SUCCESS,
                    course: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.CREATE_COURSE_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const getCourseById = (id) => {
    return (dispatch) => {
        return services.getCourseById(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_COURSE_BY_ID_SUCCESS,
                    course: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.GET_COURSE_BY_ID_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const subscribeCourse = (data) => {
    return (dispatch) => {
        return services.subscribeCourse(data).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.SUBSCRIBE_COURSE_SUCCESS,
                    data: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.SUBSCRIBE_COURSE_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const getSubscribeCourses = (id) => {
    return (dispatch) => {
        return services.getSubscribeCourses(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_SUBBED_COURSE_SUCCESS,
                    courses: response.data.courses,
                    courseData: response.data.courseData
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.GET_SUBBED_COURSE_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const editCourseAction = (id, course) => {
    return (dispatch) => {
        return services.editCourseService(id, course).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.EDIT_COURSE_SUCCESS,
                    course: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.EDIT_COURSE_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const deleteCourseAction = (id) => {
    return (dispatch) => {
        return services.deleteCourseService(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.DELETE_COURSE_SUCCESS,
                    id: id
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.DELETE_COURSE_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const rateCourseAction = (id, rating) => {
    return (dispatch) => {
        return services.rateCourseService(id, rating).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.RATE_COURSE_SUCCESS,
                    rating,
                    CourseId: id,
                    avg: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.RATE_COURSE_FAIL,
                    error: "Failed"
                })
            }
        })
    }
}

export const searchCourseAction = (query) => {
    return (dispatch) => {
        return services.searchCourseService(query).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.SEARCH_COURSES_SUCCESS,
                    courses: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.SEARCH_COURSES_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}