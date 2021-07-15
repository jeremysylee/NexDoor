import testData from '../../../../testData/testData';

const initialState = { requests: [testData.testTasks[8], testData.testTasks[9]] };

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { requests: action.requests };
    default:
      return state;
  }
};

export default requestReducer;
