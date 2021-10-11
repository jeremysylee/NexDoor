import initialTasks from './initialData';

let initialState = { tasks: initialTasks };

try {
  const initialTasksFromStorage = sessionStorage.getItem('tasks') ? JSON.parse(sessionStorage.getItem('tasks')) : initialTasks;
  initialState = { tasks: initialTasksFromStorage };
} catch (err) {
  console.log(err);
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      sessionStorage.setItem('tasks', JSON.stringify(action.tasks));
      return { tasks: action.tasks };
    default:
      return state;
  }
};

export default taskReducer;
