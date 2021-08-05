const initialState = { showSelected: false };

const showSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MAP':
      return { showSelected: action.toggle };
    default:
      return state;
  }
};

export default showSelectedReducer;
