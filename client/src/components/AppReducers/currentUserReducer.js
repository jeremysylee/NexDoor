// temporary user id until we get backend
const initialState = { userId: 37 };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { userId: action.userId };
    default:
      return state;
  }
};

export default currentUser;
