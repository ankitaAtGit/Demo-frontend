import * as types from '../constants/action.constants';

const initState = {
    wishlist: [],
    error: [],
    courseData: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_WISHLIST_SUCCESS:
            return Object.assign({}, state, { wishlist: [...action.wishlist], courseData: [...action.courseData] })
        case types.GET_WISHLIST_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.ADD_WISHLIST_SUCCESS:
            let addWishlist = [...state.wishlist, action.wishlist]
            let addCourseData = [...state.courseData, action.courseData]
            return Object.assign({}, state, { wishlist: [...addWishlist], courseData: [...addCourseData] })
        case types.ADD_WISHLIST_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.REMOVE_WISHLIST_SUCCESS:
            let { courseId } = action
            let remWishlist = state.wishlist;
            let remCourseData = state.courseData
            let x = remWishlist.findIndex(course => course.CourseId === courseId)
            let y = remCourseData.findIndex(course => course.id === courseId)
            remWishlist.splice(x, 1);
            remCourseData.splice(y, 1)
            return Object.assign({}, state, { wishlist: [...remWishlist], courseData: [...remCourseData] })
        case types.REMOVE_WISHLIST_FAIL:
            return Object.assign({}, state, { error: action.error })

        default:
            return state
    }
}