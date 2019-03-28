import * as types from '../constants/action.constants'

const initState = {
    chapter: {},
    chapters: [],
    error: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.ADD_CHAPTER_SUCCESS:
            let chapters_add = state.chapters;
            chapters_add.push(action.chapter)
            return Object.assign({}, state, { chapters: [...chapters_add] })
        case types.ADD_CHAPTER_FAIL:
            return Object.assign({}, state, { error: action.error })
        case types.GET_CHAPTERS_SUCCESS:
            return Object.assign({}, state, { chapters: action.chapters })
        case types.GET_CHAPTERS_FAIL:
            return Object.assign({}, state, { error: action.error })
        default:
            return state;
    }
}