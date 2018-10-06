import {
  GET_TURN_DATA,
  ANSWER_SELECTED,
  ADD_AUTHOR,
} from '../actions/actionTypes';
import { initialTurnData } from './initialState';

export default (state = initialTurnData, action) => {
  switch (action.type) {
    case GET_TURN_DATA:
      return { ...state, ...action.payload };
    case ANSWER_SELECTED:
      return { ...state, highlight: action.payload }
    case ADD_AUTHOR:
      return { ...state, authors: [...state.authors, action.payload] }
    default:
      return state;
  }
};
