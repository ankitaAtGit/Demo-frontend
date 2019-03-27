import * as services from '../services/category.service';
import * as types from '../constants/action.constants';

export const getCategoriesAction = () => {
    return (dispatch) => {
        return services.getCategoriesService().then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_CATEGORIES_SUCCESS,
                    categories: response.data
                })
            }
        }).catch(err => {
            if (err.response)
                dispatch({
                    type: types.GET_CATEGORIES_FAIL,
                    error: err.response.statusText
                })
        })
    }
}

