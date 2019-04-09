import * as types from '../constants/action.constants'

const initState = {
    allCourses: [],
    error: '',
    courses: [],
    course: {},
    subbedCourses: [],
    subCourseDetails: [],
    searchedCourses: []
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
            return Object.assign({}, state, { error: '', allCourses: [...action.courses] })
        case types.GET_ALL_COURSES_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.GET_COURSE_BY_ID_SUCCESS:
            return Object.assign({}, state, { error: '', course: { ...action.course } })
        case types.GET_COURSE_BY_ID_FAIL:
            return Object.assign({}, state, { error: action.error, course: {} })

        case types.CREATE_COURSE_SUCCESS:
            return Object.assign({}, state, { course: action.course, allCourses: [...state.allCourses, action.course] })
        case types.CREATE_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.SUBSCRIBE_COURSE_SUCCESS:
            let { subbedCourses, subCourseDetails } = state;
            let courseSub = state.course;
            courseSub.subscriberCount = action.data.subscriberCount
            subbedCourses.push(action.data)
            subCourseDetails.push(action.course)
            return Object.assign({}, state, { error: '', course: { ...courseSub }, subbedCourses: [...subbedCourses], subCourseDetails: [...subCourseDetails] })
        case types.SUBSCRIBE_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error, data: {} })

        case types.GET_SUBBED_COURSE_SUCCESS:
            return Object.assign({}, state, { error: '', subbedCourses: [...action.courses], subCourseDetails: [...action.courseData] })
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
            let { CourseId, rating, avg } = action;
            let rateCourses = state.subbedCourses;
            let x = rateCourses.findIndex(course => course.CourseId === CourseId && course.UserId === rating.UserId)
            rateCourses[x].course_rating = rating.course_rating;
            let course = state.course
            course.course_rating = avg
            return Object.assign({}, state, { error: '', subbedCourses: [...rateCourses], course: { ...course } })
        case types.RATE_COURSE_FAIL:
            return Object.assign({}, state, { error: action.error, course: {} })

        default:
            return state;
    }
}