import { testTasks } from './initialData';

const initialState = { requests: [testTasks[0]] };

const myRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { myRequests: action.myRequests };
    default:
      return state;
  }
};

export default myRequestsReducer;
