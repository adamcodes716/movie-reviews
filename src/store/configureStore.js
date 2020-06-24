import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from '../reducers/movies';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

/// if dev tools doesn't exist then use compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
     combineReducers({
      movies: moviesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  //console.log ('getting store state', store.getState());
  return store;
};
