import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

// import tasksReducer from './components/MainFeed/reducers/tasksReducer';
// import myRequestsReducer from './components/MainFeed/reducers/myRequestsReducer';
// import myTasksReducer from './components/MainFeed/reducers/myTasksReducer';
// import selectedTaskReducer from './components/MainFeed/SelectedTask/reducers/selectedTaskReducer';
// import taskDataFormattedReducer from './components/MainFeed/SelectedTask/reducers/taskDataFormattedReducer';
// import currentUserReducer from './components/AppReducers/currentUserReducer';
// import showSelectedReducer from './components/AppReducers/showSelectedReducer';
// import locationReducer from './components/AppReducers/locationReducer';
// import taskCategoryReducer from './components/MainFeed/SelectedTask/reducers/taskCategoryReducer';
// import addRequestModalReducer from './components/AppReducers/addRequestModalReducer';
// import currentPageReducer from './components/AppReducers/currentPageReducer';
import tasksReducer from './reducers/tasksReducer';
import myRequestsReducer from './reducers/myRequestsReducer';
import myTasksReducer from './reducers/myTasksReducer';
import selectedTaskReducer from './reducers/selectedTaskReducer';
import taskDataFormattedReducer from './reducers/taskDataFormattedReducer';
import currentUserReducer from './reducers/currentUserReducer';
import showSelectedReducer from './reducers/showSelectedReducer';
import locationReducer from './reducers/locationReducer';
import taskCategoryReducer from './reducers/taskCategoryReducer';
import addRequestModalReducer from './reducers/addRequestModalReducer';
import currentPageReducer from './reducers/currentPageReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    tasksReducer,
    selectedTaskReducer,
    myRequestsReducer,
    myTasksReducer,
    taskDataFormattedReducer,
    currentUserReducer,
    showSelectedReducer,
    locationReducer,
    taskCategoryReducer,
    addRequestModalReducer,
    currentPageReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
