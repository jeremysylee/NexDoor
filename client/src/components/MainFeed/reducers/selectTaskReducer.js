import testData from '../../../../testData/testData';

const initialState = { task: testData.testTasks[0] };

const selectTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASK':
      return { task: action.task };
    default:
      return state;
  }
};

export default selectTaskReducer;
