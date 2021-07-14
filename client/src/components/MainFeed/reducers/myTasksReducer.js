import testData from '../../../../testData/testData';

const initialState = { myTasks: [testData.testTasks[3]] };

const myTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MY_TASKS':
      return { myTasks: action.myTasks };
    default:
      return state;
  }
};

export default myTasksReducer;
