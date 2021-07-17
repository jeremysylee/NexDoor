const initialState = { showMap: true };

const showMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MAP':
      return { showMap: action.toggle };
    default:
      return state;
  }
};

export default showMapReducer;
