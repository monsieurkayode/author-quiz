import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTurnDataAction } from '../actions/quizActions';
import Hero from './Hero';
import Turn from './Turn';
import Continue from './Continue';
import Footer from './Footer';

import '../styles/AuthorQuiz.css';

class AuthorQuiz extends Component {
  componentWillMount() {
    this.props.getTurnDataAction();
  }

  render() {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn />
        <Continue />
        <p><Link to="/add" >Add an author</Link></p>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getTurnDataAction })(AuthorQuiz);
