import { combineReducers } from 'redux';

import tasksReducer from './tasksReducer';
import myRequestsReducer from './myRequestsReducer';
import myTasksReducer from './myTasksReducer';
import selectedTaskReducer from './selectedTaskReducer';
import taskDataFormattedReducer from './taskDataFormattedReducer';
import currentUserReducer from './currentUserReducer';
import locationReducer from './locationReducer';
import taskCategoryReducer from './taskCategoryReducer';
import addRequestModalReducer from './addRequestModalReducer';
import currentPageReducer from './currentPageReducer';
import modalRequestCardReducer from './modalRequestCardReducer';

export default combineReducers({
  tasksReducer,
  selectedTaskReducer,
  myRequestsReducer,
  myTasksReducer,
  taskDataFormattedReducer,
  currentUserReducer,
  locationReducer,
  taskCategoryReducer,
  addRequestModalReducer,
  currentPageReducer,
  modalRequestCardReducer,
});
