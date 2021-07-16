import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

import tasksReducer from './components/MainFeed/reducers/tasksReducer';
import requestsReducer from './components/MainFeed/reducers/requestsReducer';
import myTasksReducer from './components/MainFeed/reducers/myTasksReducer';
import selectedTaskReducer from './components/SelectedTask/reducers/selectedTaskReducer';
import taskDataFormattedReducer from './components/SelectedTask/reducers/taskDataFormattedReducer';
import currentUserReducer from './components/AppReducers/currentUserReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    tasksReducer,
    selectedTaskReducer,
    requestsReducer,
    myTasksReducer,
    taskDataFormattedReducer,
    currentUserReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
