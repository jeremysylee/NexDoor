import { testTasks } from './initialData';

const initialState = { tasks: testTasks };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { tasks: action.tasks };
    default:
      return state;
  }
};

export default taskReducer;
