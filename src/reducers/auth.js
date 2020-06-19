export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { uid: action.uid  };
      // return state;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
