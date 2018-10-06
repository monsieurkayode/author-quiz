import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};
const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStoreWithMiddlewares(rootReducer, initialState, enhancers);

export default store;
