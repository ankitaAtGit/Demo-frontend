import * as services from '../services/chapter.service';
import * as types from '../constants/action.constants';

export const addChapterAction = (chapterData) => {
    return (dispatch) => {
        return services.addChapterService(chapterData).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.ADD_CHAPTER_SUCCESS,
                    chapter: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.ADD_CHAPTER_FAIL,
                    error: 'Failed'
                })
            }
        })
    }
}

export const getChaptersAction = (id) => {
    return (dispatch) => {
        return services.getChapterByCourse(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_CHAPTERS_SUCCESS,
                    chapters: response.data
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.GET_CHAPTERS_FAIL,
                    error: 'Failed'
                })
            }
        })
    }
}

export const deleteChapterAction = (id) => {
    return (dispatch) => {
        return services.deleteChapterService(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.DELETE_CHAPTER_SUCCESS,
                    id
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.DELETE_CHAPTER_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}

export const deleteFileAction = (file, id) => {
    return (dispatch) => {
        return services.deleteFileService(file, id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.DELETE_FILE_SUCCESS,
                    file, id
                })
            }
        }).catch(err => {
            if (err.response) {
                dispatch({
                    type: types.DELETE_FILE_FAIL,
                    error: err.response.data.error
                })
            }
        })
    }
}