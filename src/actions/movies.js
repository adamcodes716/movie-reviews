import uuid from 'uuid';  
import database from '../firebase/firebase';

// ADD MOVIE

export const addMovie = (movie) => ({
    type: 'ADD_MOVIE',
    movie
});

// export const startAddMovie


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
      return database.ref(`users/${uid}/movies/${id}`).update(updates).then(() => {
        dispatch(editMovies(id, updates));
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
      console.log ('uid', uid);
      return database.ref(`users/${uid}/movies`).once('value').then((snapshot) => {
        const movies = [];
  
        snapshot.forEach((childSnapshot) => {
          movies.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setMovies(movies));
      });
    };
  };