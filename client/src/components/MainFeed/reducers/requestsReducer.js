import testData from '../../../../testData/testData';

const initialState = { requests: [testData.testTasks[6], testData.testTasks[3]] };

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { requests: action.requests };
    default:
      return state;
  }
};

export default requestReducer;
