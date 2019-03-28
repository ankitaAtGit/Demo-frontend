import { combineReducers } from 'redux';
import auth from './auth.reducer';
import category from './category.reducer';
import course from './course.reducer';
import chapter from './chapter.reducer'

export default combineReducers({ auth, category, course, chapter });
