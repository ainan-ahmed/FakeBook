import entitiesReducer from './entities'
import { combineReducers } from 'redux';
import usersReducer from "./users";
import postsReducer from "./posts";
export default combineReducers({
  auth: usersReducer,
  posts: postsReducer,
});
