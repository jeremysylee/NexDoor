// temporary user id until we get backend
const initialState = { userId: 0 };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        userData: action.userData,
      };
    default:
      return state;
  }
};

export default currentUser;
