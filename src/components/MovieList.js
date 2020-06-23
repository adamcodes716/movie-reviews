import React from 'react'
import { connect } from 'react-redux';  // connection to the store
import MovieListItem from './MovieListItem';
import selectMovies from '../selectors/movies';


export const MovieList = (props) => (

    <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Movies</div>

    </div>  
    <div className="list-body">
      {
          props.movies.length === 0 ? (
          <div className="liste-item--message">
            <span><p>No Movies</p></span>
          </div>
        ) : (
            /*
              props.movies.map((movie) => {  // iterate over the movie array
                console.log ("about to iterate over props.movies");
                return <MovieListItem key={movie.id} {...movie} />;
            })
            */
            <div> Movies! </div>
          )
        
      }
    </div>
      {
       <div className="container"> 
         <div className="movie-card">
         <div className="movie-header movie-cover" style={{backgroundImage: "url('https://image.tmdb.org/t/p/w500//pizynKUzJ9YucGff1O1MYisY1WM.jpg')"}}>
           <div className="header-icon-container">
             <a href="#">
               <i className="material-icons header-icon"></i>
             </a>
           </div>
         </div>
         <div className="movie-content">
           <div className="movie-content-header">
             <a href="#">
               <h3 className="movie-title">Man of Steel</h3>
             </a>
             <div className="imax-logo"></div>
           </div>
           <div className="movie-info">
             <div className="info-section">
               <label>Date & Time</label>
               <span>Sun 8 Sept - 10:00PM</span>
             </div>
             <div className="info-section">
               <label>Screen</label>
               <span>03</span>
             </div>
             <div className="info-section">
               <label>Row</label>
               <span>F</span>
             </div>
             <div className="info-section">
               <label>Seat</label>
               <span>21,22</span>
             </div>
           </div>
         </div>
       </div>
      </div> 
      }   
  </div>
);


// export {Movielist as default};
const mapStateToProps = (state) => {
  console.log ('Mapping state to props');
  console.log('state.movies', state.movies);
  console.log('state.filters', state.filters);
  return {
    movies: selectMovies(state.movies) // selectMovies(state.movies, state.filters)
  };
};

export default connect(mapStateToProps)(MovieList);