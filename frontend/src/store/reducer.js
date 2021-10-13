import entitiesReducer from './entities'
import { combineReducers } from 'redux';
import usersReducer from "./users";
import postsReducer from "./posts";
import errorsReducer from "./errors";
export default combineReducers({
  auth: usersReducer,
  posts: postsReducer,
  errors:  errorsReducer
});
