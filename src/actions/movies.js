import uuid from 'uuid';  
import database from '../firebase/firebase';

// ADD MOVIE

export const addMovie = (movie) => ({
    type: 'ADD_MOVIE',
    movie
});


export const startAddMovie = (movieData = {}) => {
    // second argument "getState".  Call it to get current state
    return (dispatch, getState) => {
      const uid = getState().auth.uid; 
      const {
        title = '',
        ratingComment = '',
        rating = '',
        createdAt = 0,
      } = movieData;
      const movie = { title, ratingComment, rating, createdAt };
  
      // database.ref(`users/${uid}/movies`).child('1234').set(movie);
        
     //   return database.ref(`users/${uid}/movies`).push(movie).then((ref) => {
     //   database.ref(`users/${uid}/movies`).push(movie);
     
     
     //database.ref(`users/${uid}/movies`).child('1234').setValue(...movie);
  
     // return database.ref(`users/${uid}/movies`).child('1234').setValue(movie).then((ref) => {
        return database.ref(`users/${uid}/movies`).push(movie).then((ref) => {
            dispatch(addMovie({
            id: '56778', //ref.key,
            key: '56778',
            displayName : auth.displayName,
            ...movie
            }));
        });
      
        
     
  };
};



// REMOVE_MOVIE
export const removeMovie = ({ id } = {} ) => ({
    type: 'REMOVE_MOVIE',
    id
});

export const startRemoveMovie = ({ id } = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid
      return database.ref(`users/${uid}/movies/${id}`).remove().then(() => {
        dispatch(removeMovie({ id }));
      });
    };
  };

  
// EDIT_MOVIE
export const editMovie = (id, updates) => ({
    type: 'EDIT_MOVIE',
    id,
    updates
  });
  
  export const startEditMovie = (id, updates) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid
     // console.log("uid = ", uid);
     // console.log("id = ", id);
      return database.ref(`users/${uid}/movies/${id}`).update(updates).then(() => {
        dispatch(editMovies(id, updates));  // run this after codes is sync'd
      });
    };
  };


// SET_MOVIES
export const setMovies = (movies) => ({
    type: 'SET_MOVIES',
    movies
  });
  
  export const startSetMovies = () => {  // initial load of the movie dataset
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
     // console.log ('uid', uid);
      return database.ref(`users/${uid}/movies`).once('value').then((snapshot) => {
        const movies = [];
  
        snapshot.forEach((childSnapshot) => {
          //  console.log ('getting a child', childSnapshot.key);
          movies.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        // console.log ('movies', movies);  // this returns 3 movies
        dispatch(setMovies(movies));
        // console.log ('after dispatch set movies');
      });
    };
  };