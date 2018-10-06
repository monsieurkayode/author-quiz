import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import AuthorQuiz from './components/AuthorQuiz.jsx';
import AddAuthorForm from './components/AddAuthorForm.jsx';
import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route exact path="/add" component={AddAuthorForm} />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
