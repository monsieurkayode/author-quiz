import { combineReducers } from 'redux';
import quizReducer from './quizReducer';

const rootReducer = combineReducers({
  turnData: quizReducer,
});

export default rootReducer;
