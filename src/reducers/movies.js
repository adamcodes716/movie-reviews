// Movies Reducer

const moviesReducerDefaultState = [];

export default (state = moviesReducerDefaultState, action) => {
  //console.log ("REDUCER STATE", state);

  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        action.movie
      ];
    case 'REMOVE_MOVIE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_MOVIE':
      return state.map((movie) => {
        if (movie.id === movie.id) {
          return {
            ...movie,
            ...movie.updates
          };
        } else {
          return movie;
        };
      });
      case 'SET_MOVIES': // designed to just set movies array
     // console.log ('REDUCER Set Movies', action.movies);
        return action.movies;
    default:
      return state;
  }
};