import testData from '../../../../testData/testData';

const initialState = (state = { tasks: testData.testTasks }, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { tasks: action.tasks };
    default:
      return state;
  }
};

export default initialState;
