import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetMovies } from './actions/movies';
// import { setTextFilter} from './actions/filters';
import { login, logout, loginName } from './actions/auth';
import getVisibleMovies from './selectors/movies';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

// documentation:  https://docs.google.com/document/d/1mz1dTSLlgrKobQEvY4E5raYqlUXHpmXOVCzo78mYmvk/edit?usp=sharing

const store = configureStore();
//Router AppRouter is rendered inside of “Provider” which makes the Redux store available to any nested components.  
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

//Render loadingPage to show while page is loading
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {  // runs on user login or logout
  if (user) {
    console.log('log in. ', user.displayName);
    store.dispatch(login(user.uid, user.displayName));  // update the store
   // store.dispatch(loginName(user.displayName));  // update the store
     console.log('finished login dispatch');
    store.dispatch(startSetMovies()).then(() => {  // load movie dataset
      // console.log ('inside startSetMovies dispatch');
     renderApp();
      if (history.location.pathname ==='/') { // check to see if they are on login page - just logged in
        history.push('/dashboard');  // just logged in, redirect to dashboard
      };
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
