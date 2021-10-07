import { testTasks } from './initialData';

let initialState = { tasks: testTasks };

// try {
//   const initialTasks = sessionStorage.getItem('tasks') ? JSON.parse(sessionStorage.getItem('tasks')) : testTasks;
//   initialState = { tasks: initialTasks };
// } catch (err) {
//   console.log(err);
// }

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      // sessionStorage.setItem('tasks', JSON.stringify(action.tasks));
      return { tasks: action.tasks };
    default:
      return state;
  }
};

export default taskReducer;
