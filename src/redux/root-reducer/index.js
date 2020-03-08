import { combineReducers } from "redux";
import postsDataReducer from "./posts-data.reducer.js";
import formReducer from './form.reducer.js';

const rootReducer = combineReducers({
  posts: postsDataReducer,
  form: formReducer
});

export default rootReducer;
