import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

import tasksReducer from './components/MainFeed/reducers/tasksReducer';
import selectedTaskReducer from './components/SelectedTask/reducers/selectedTaskReducer';
import requestsReducer from './components/MainFeed/reducers/requestsReducer';
import myTasksReducer from './components/MainFeed/reducers/myTasksReducer';
import taskDataFormattedReducer from './components/SelectedTask/reducers/taskDataFormattedReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    tasksReducer,
    selectedTaskReducer,
    requestsReducer,
    myTasksReducer,
    taskDataFormattedReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
