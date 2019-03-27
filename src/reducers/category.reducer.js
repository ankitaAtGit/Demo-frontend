import * as types from '../constants/action.constants'

const initState = {
    categories: [],
    error: '',
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, { categories: [...action.categories], error: '' })
        case types.GET_CATEGORIES_FAIL:
            return Object.assign({}, state, { error: action.error, categories: [] })
        default:
            return state;
    }
}