const initialState = { category: 'open', role: '', statusText: '' };

const taskCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        role: action.role,
        status: action.status,
        statusText: action.statusText,
      };
    default:
      return state;
  }
};

export default taskCategoryReducer;
