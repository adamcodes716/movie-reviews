import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
// import moviesReducer from '../reducers/movies';
// import filtersReducers from '../reducers/filters';

/// if dev tools doesn't exist then use compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
     combineReducers({
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  console.log ('getting store state', store.getState());
  return store;
};
