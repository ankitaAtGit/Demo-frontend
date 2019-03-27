import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import reducer from './reducers/root';

const composeEnhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancer(applyMiddleware(thunk));

const initState = {
    auth: {
        token: '',
        id: '',
        error: '',
        user: {
            user: {},
            error: ''
        }
    },
    category: {
        categories: [],
        error: '',
    },
    course: {
        error: '',
        course: {},
        courses: [],
        subbedCourses: []
    }
}
if (localStorage.getItem('token') && localStorage.getItem('id')) {
    initState.auth.token = localStorage.getItem('token');
    initState.auth.id = localStorage.getItem('id');
}
export default createStore(reducer, initState, enhancer);