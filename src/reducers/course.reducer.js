import * as types from '../constants/action.constants'

const initState = {
    error: '',
    courses: [],
    course: {},
    subbedCourses: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_COURSES_SUCCESS:
            return Object.assign({}, state, { error: '', courses: [...action.courses] })
        case types.GET_COURSES_FAIL:
            return Object.assign({}, state, { error: action.error, courses: [] })

        case types.GET_USER_COURSES_SUCCESS:
            return Object.assign({}, state, { error: '', courses: [...action.courses] })
        case types.GET_USER_COURSES_FAIL:
            return Object.assign({}, state, { error: action.error, courses: [] })

        case types.GET_ALL_COURSES_SUCCESS:
            return Object.assign({}, state, { error: '', courses: [...action.courses] })
        case types.GET_ALL_COURSES_FAIL:
            return Object.assign({}, state, { error: action.error, courses: [] })

        case types.GET_COURSE_BY_ID_SUCCESS:
            return Object.assign({}, state, { error: '', course: { ...action.course } })
        case types.GET_COURSE_BY_ID_FAIL:
            return Object.assign({}, state, { error: action.error, course: {} })

        case types.SUBSCRIBE_COURSE_SUCCESS:
            let { subbedCourses } = state;
            subbedCourses.push(action.data)
            return Object.assign({}, state, { error: '', subbedCourses: [...subbedCourses] })
        case types.SUBSCRIBE_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error, data: {} })

        case types.GET_SUBBED_COURSE_SUCCESS:
            return Object.assign({}, state, { error: '', subbedCourses: [...action.courses] })
        case types.GET_SUBBED_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error, subbedCourses: [] })

        case types.EDIT_COURSE_SUCCESS:
            return Object.assign({}, state, { error: '', course: { ...action.course } })
        case types.EDIT_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error, course: {} })

        case types.DELETE_COURSE_SUCCESS:
            let { courses } = state;
            let { id } = action;
            let i = courses.findIndex(course => course.id === id);
            courses.splice(i, 1);
            return Object.assign({}, state, { error: '', courses: [...courses] })
        case types.DELETE_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.RATE_COURSE_SUCCESS:
            let { CourseId, rating } = action;
            let rateCourses = state.subbedCourses;
            let x = rateCourses.findIndex(course => course.CourseId === CourseId && course.UserId === rating.UserId)
            rateCourses[x].course_rating = rating.course_rating;
            return Object.assign({}, state, { error: '', subbedCourses: [...rateCourses] })
        case types.RATE_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error, course: {} })

        default:
            return state;
    }
}