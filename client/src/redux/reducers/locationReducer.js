const initialState = {};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { location: action.location };
    default:
      return state;
  }
};

export default locationReducer;
