import { func, string, shape, arrayOf } from 'prop-types';

const books = arrayOf(string),
authorType = shape({
  name: string.isRequired,
  imageUrl: string.isRequired,
  imageSource: string.isRequired,
  books: books.isRequired
});

export const types = {
  highlight: string,
  author: authorType,
  books,
  onAnswerSelected: func,
  title: string,
  turnData: shape({
    author: authorType.isRequired,
    books: books.isRequired
  }),
};
