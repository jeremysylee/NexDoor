import { testTasks } from '../../../testData/testData';

const initialState = { myTasks: [testTasks[0]] };

const myTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MY_TASKS':
      return { myTasks: action.myTasks };
    default:
      return state;
  }
};

export default myTasksReducer;
