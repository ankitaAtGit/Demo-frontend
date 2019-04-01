import * as types from '../constants/action.constants';

const initState = {
    cart: [],
    count: 0,
    error: '',
    courseData: []
}

export default (state = initState, action) => {
    switch (action.type) {

        case types.ADD_TO_CART_SUCCESS:
            let addCart = state.cart;
            let addCount = state.count + 1;
            addCart.push(action.cart)
            return Object.assign({}, state, { cart: [...addCart], count: addCount })
        case types.ADD_TO_CART_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.GET_CART_SUCCESS:
            return Object.assign({}, state, { cart: [...action.cart], courseData: [...action.courseData] })
        case types.GET_CART_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.COUNT_CART_SUCCESS:
            return Object.assign({}, state, { count: action.count })
        case types.COUNT_CART_FAIL:
            return Object.assign({}, state, { error: action.error })

        case types.REMOVE_CART_SUCCESS:
            let removeCart = state.cart;
            let removeCourse = state.courseData;
            let removeCount = state.count
            if (removeCount > 0)
                removeCount = removeCount - 1;
            let x = removeCart.findIndex(cart => cart.CourseId === action.id)
            let y = removeCourse.findIndex(course => course.id === action.id)
            removeCart.splice(x, 1);
            removeCourse.splice(y, 1)
            return Object.assign({}, state, { cart: [...removeCart], courseData: [...removeCourse], count: removeCount })
        case types.REMOVE_CART_FAIL:
            return Object.assign({}, state, { error: action.error })

        default: return state
    }
}