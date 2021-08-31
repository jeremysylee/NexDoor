const initialState = { page: '/' };

const currentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { page: action.page };
    default:
      return state;
  }
};

export default currentPageReducer;
