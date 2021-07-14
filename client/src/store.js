import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

import tasksReducer from './components/MainFeed/reducers/tasksReducer';
import selectTaskReducer from './components/MainFeed/reducers/selectTaskReducer';
import requestsReducer from './components/MainFeed/reducers/requestsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    tasksReducer,
    selectTaskReducer,
    requestsReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
