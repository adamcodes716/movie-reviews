// Movies Reducer

const moviesReducerDefaultState = [];

export default (state = moviesReducerDefaultState, action) => {
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
      case 'SET_MOVIE': // designed to just set movies array
        return action.movie;
    default:
      return state;
  }
};