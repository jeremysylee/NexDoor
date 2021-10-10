const initialState = { toggle: false };

const modalRequestCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_REQUEST_MODAL':
      return { toggle: action.toggle };
    default:
      return state;
  }
};

export default modalRequestCardReducer;
