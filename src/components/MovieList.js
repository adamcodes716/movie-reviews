import React from 'react'
import { connect } from 'react-redux';  // connection to the store

import MovieListItem from './MovieListItem';
import selectMovies from '../selectors/movies';


export const MovieList = (props) => (

    <div className="content-container">
  
    <div className="container">
   
      {
          props.movies.length === 0 ? (
          <div className="liste-item--message">
            <span><p>No Movies</p></span>
          </div>
        ) : (
                props.movies.map((movie) => {  
                console.log ("about to iterate over props.movies");
                return <MovieListItem key={movie.id} {...movie} />;
            })

          )
        
      }
    </div>
  </div>
);


// export {Movielist as default};
const mapStateToProps = (state) => {
  //console.log ('Mapping state to props');
  //console.log('state.movies', state.movies);
  //console.log('state.filters', state.filters);
  return {
    movies: selectMovies(state.movies, state.filters) 
  };
};

export default connect(mapStateToProps)(MovieList);