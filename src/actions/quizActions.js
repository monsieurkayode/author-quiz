import {
  ANSWER_SELECTED,
  GET_TURN_DATA,
  ADD_AUTHOR,
} from './actionTypes';
import { shuffle, sample } from 'underscore';

export const onAnswerSelectAction = highlight => ({
  type: ANSWER_SELECTED,
  payload: highlight
});

export const getTurnDataSuccess = turnData => ({
  type: GET_TURN_DATA,
  payload: turnData
});

export const onAnswerSelect = highlight => dispatch => dispatch(
  onAnswerSelectAction(highlight)
);

export const getTurnData = (authors) => {
  const allBooks = authors.reduce(
    (books, author) => books.concat(author.books), []
  );
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some(title => title === answer)),
    highlight: 'none',
  };
};

export const getTurnDataAction = () => (dispatch, getState) => {
  const authors = getState().turnData.authors;
  dispatch(getTurnDataSuccess(getTurnData(authors)));
}

export const addAuthorAction = author => ({
  type: ADD_AUTHOR,
  payload: author
});

export const addAuthor = author => dispatch => dispatch(
  addAuthorAction(author)
);
