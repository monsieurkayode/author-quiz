import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAuthor } from '../actions/quizActions';

import '../styles/AddAuthorForm.css';

class AddAuthorForm extends Component {
  state = {
    name: '',
    imageUrl: '',
    imageSource: '',
    books: [],
    bookTemp: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addAuthor(this.state);
    this.props.history.push('/');
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onAddBook = () => {
    this.setState(prevState => ({
      books: prevState.books.concat(this.state.bookTemp),
      bookTemp: ''
    }))
  }

  render() {
    const { name, imageUrl, imageSource, books, bookTemp } = this.state;

    return(
      <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="AddAuthorForm__input">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={this.handleChange}
              type="text"
              name="name"
              required
            />
          </div>
          <div className="AddAuthorForm__input">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              value={imageUrl}
              onChange={this.handleChange}
              type="text"
              name="imageUrl"
              required
            />
          </div>
          <div className="AddAuthorForm__input">
            <label htmlFor="imageSource">Image SRC</label>
            <input
              value={imageSource}
              onChange={this.handleChange}
              type="text"
              name="imageSource"
            />
          </div>
          <div className="AddAuthorForm__input">
            <label htmlFor="bookTemp">Books</label>
            {books.map(book => <p key={book}>{book}</p>)}
            <input
              value={bookTemp}
              onChange={this.handleChange}
              type="text"
              name="bookTemp"
            />
            <input className="btn btn-sm btn-primary" type="button" onClick={this.onAddBook} value=" + " />
          </div>
          <input className="btn btn-primary" type="submit" value="Add"/>
        </form>
      </div>
    );
  }
}  

export default withRouter(connect(null, { addAuthor })(AddAuthorForm));
