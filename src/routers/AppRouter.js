import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddMoviePage from '../components/AddMoviePage';
import EditMoviePage from '../components/EditMoviePage';
import AutoCompleteText from '../components/AutocompleteText';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

// note that we get handle to browser's history
const AppRouter = () => (
  <Router history={history}>  
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create" component={AddMoviePage} />
        <PrivateRoute path="/search" component={AutoCompleteText} />
        <PrivateRoute path="/edit/:id" component={EditMoviePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
