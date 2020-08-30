import entitiesReducer from './entities'
import { combineReducers } from 'redux';
export default combineReducers({
  entities: entitiesReducer,
});
