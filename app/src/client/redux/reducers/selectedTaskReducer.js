import initialTasks from './initialData';

let initialState = { task: initialTasks[0] };

try {
  const initialTask = sessionStorage.getItem('selected_task') ? JSON.parse(sessionStorage.getItem('selected_task')) : initialTasks[0];
  initialState = { task: initialTask };
} catch (err) {
  console.log(err);
}

const selectedTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASK':
      sessionStorage.setItem('selected_task', JSON.stringify(action.task));
      return { task: action.task };
    default:
      return state;
  }
};

export default selectedTaskReducer;
