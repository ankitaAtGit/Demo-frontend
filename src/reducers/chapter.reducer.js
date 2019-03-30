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

        case types.DELETE_CHAPTER_SUCCESS:
            let chaptersDelete = state.chapters
            let del_i = chaptersDelete.findIndex(chapter => chapter.id === action.id)
            chaptersDelete.splice(del_i, 1);
            return Object.assign({}, state, { chapters: [...chaptersDelete] })
        case types.DELETE_CHAPTER_FAIL:
            return Object.assign({}, state, { error: action.error });

        case types.DELETE_FILE_SUCCESS:
            let chapterDel = state.chapters
            let delFile_i = chapterDel.findIndex(chapter => chapter.id === action.id);
            let chapterFiles = JSON.parse(chapterDel[delFile_i].chapter_files);
            let file_i = chapterFiles.findIndex(file => file === action.file);
            chapterFiles.splice(file_i, 1)
            chapterDel[delFile_i].chapter_files = JSON.stringify(chapterFiles);
            return Object.assign({}, state, { chapters: [...chapterDel] })
        case types.DELETE_FILE_FAIL:
            return Object.assign({}, state, { error: action.error });

        default:
            return state;
    }
}