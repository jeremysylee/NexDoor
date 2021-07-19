import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
// import { configureStore, combineReducers } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import tasksReducer from './components/MainFeed/reducers/tasksReducer';
import requestsReducer from './components/MainFeed/reducers/requestsReducer';
import myTasksReducer from './components/MainFeed/reducers/myTasksReducer';
import selectedTaskReducer from './components/SelectedTask/reducers/selectedTaskReducer';
import taskDataFormattedReducer from './components/SelectedTask/reducers/taskDataFormattedReducer';
import currentUserReducer from './components/AppReducers/currentUserReducer';
import showMapReducer from './components/AppReducers/showMapReducer';
import locationReducer from './components/AppReducers/locationReducer';
import taskCategoryReducer from './components/SelectedTask/reducers/taskCategoryReducer';
import addRequestModalReducer from './components/AppReducers/addRequestModalReducer';
import currentPageReducer from './components/AppReducers/currentPageReducer';

import tasksSliceReducer from './components/MainFeed/tasksSlice';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    tasksReducer,
    selectedTaskReducer,
    requestsReducer,
    myTasksReducer,
    taskDataFormattedReducer,
    currentUserReducer,
    showMapReducer,
    locationReducer,
    taskCategoryReducer,
    addRequestModalReducer,
    currentPageReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

// const reducers = combineReducers({
//   tasksReducer,
//   selectedTaskReducer,
//   requestsReducer,
//   myTasksReducer,
//   taskDataFormattedReducer,
//   currentUserReducer,
//   showMapReducer,
//   locationReducer,
//   taskCategoryReducer,
//   tasks: tasksSliceReducer,
// });

// const store = configureStore({
//   reducer: reducers,
// });

export default store;
