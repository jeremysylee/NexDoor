import { testTasks } from './initialData';

const initialState = { task: testTasks[0] };

const selectedTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASK':
      return { task: action.task };
    default:
      return state;
  }
};

export default selectedTaskReducer;
