const initialState = { toggle: false, mode: 'new' };

const addRequestModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_AR_MODAL':
      return { toggle: action.toggle, mode: action.mode };
    default:
      return state;
  }
};

export default addRequestModalReducer;
