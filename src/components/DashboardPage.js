import React from 'react';
import MovieListFilters from './MovieListFilters';
import MovieList from './MovieList';

const DashboardPage = () => (
  <div>
     <MovieListFilters /> 
     <MovieList />
  </div>
);

export default DashboardPage;
