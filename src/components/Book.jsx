import React from 'react';
import { types } from '../@types';

const Book = ({ title, onClick }) => (
  <div className="answer" onClick={() => onClick(title)}>
    <h4>{title}</h4>
  </div>
);

Book.propTypes = {
  title: types.title.isRequired,
  onClick: types.onAnswerSelected.isRequired
}

export default Book;
