const initialState = { task: {} };

const selectTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASK':
      return { task: action.task };
    default:
      return state;
  }
};

export default selectTaskReducer;
