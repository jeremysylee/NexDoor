import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';

import tasksReducer from './components/MainFeed/reducers/tasksReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    tasksReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
