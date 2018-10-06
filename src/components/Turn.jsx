import React from 'react';
import { connect } from 'react-redux';
import { types } from '../@types';
import { onAnswerSelect } from '../actions/quizActions';
import Book from './Book';

const Turn  = ({ author, books, highlight, onAnswerSelect }) => {
  const onAnswerSelected = answer => {
    const isCorrect = author.books.some(book => book === answer);
    const highlight = isCorrect ? 'right' : 'wrong';
    onAnswerSelect(highlight);
  }

  const highlightBgColor = (highlight) => {
    const mappings = {
      none: '',
      right: '#3FA',
      wrong: '#F55'
    }

    return mappings[highlight];
  }

    return (
      <div className="row turn" style={{background: highlightBgColor(highlight)}}>
        <div className="col-4 offset-1">
          <img src={author.imageUrl} alt={author.name} className="authorimage"/>
        </div>
        <div className="col-6">
          {books.map(title => <Book
            key={title}
            title={title}
            onClick={onAnswerSelected}
          />)}
        </div>
      </div>
    );
  }

Turn.propTypes = {
  author: types.author.isRequired,
  highlight: types.highlight.isRequired,
  books: types.books.isRequired,
  onAnswerSelect: types.onAnswerSelected.isRequired
}

const mapStateToProps = ({ turnData }) => ({
  ...turnData
});

export default connect(mapStateToProps, { onAnswerSelect })(Turn);
