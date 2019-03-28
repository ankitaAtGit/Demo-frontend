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