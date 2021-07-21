const initialState = { toggle: false };

const addRequestModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_AR_MODAL':
      return { toggle: action.toggle };
    default:
      return state;
  }
};

export default addRequestModalReducer;
