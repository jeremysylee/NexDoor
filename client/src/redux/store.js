import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

import tasksReducer from './reducers/tasksReducer';
import myRequestsReducer from './reducers/myRequestsReducer';
import myTasksReducer from './reducers/myTasksReducer';
import selectedTaskReducer from './reducers/selectedTaskReducer';
import taskDataFormattedReducer from './reducers/taskDataFormattedReducer';
import currentUserReducer from './reducers/currentUserReducer';
import locationReducer from './reducers/locationReducer';
import taskCategoryReducer from './reducers/taskCategoryReducer';
import addRequestModalReducer from './reducers/addRequestModalReducer';
import currentPageReducer from './reducers/currentPageReducer';
import modalRequestCardReducer from './reducers/modalRequestCardReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
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
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
