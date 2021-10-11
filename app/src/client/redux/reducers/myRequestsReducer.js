import initialTasks from './initialData';

const initialState = { requests: [initialTasks[0]] };

const myRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { myRequests: action.myRequests };
    default:
      return state;
  }
};

export default myRequestsReducer;
