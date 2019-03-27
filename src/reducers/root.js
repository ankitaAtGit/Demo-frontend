import { combineReducers } from 'redux';
import auth from './auth.reducer';
import category from './category.reducer';
import course from './course.reducer';

export default combineReducers({ auth, category, course });
