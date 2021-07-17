import { testTasks } from '../../../../testData/testData';

const initialState = { requests: [testTasks[0]] };

// const initialState = {}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { requests: action.requests };
    default:
      return state;
  }
};

export default requestReducer;
