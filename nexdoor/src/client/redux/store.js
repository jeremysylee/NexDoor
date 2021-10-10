import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(
//   combineReducers({
//     tasksReducer,
//     selectedTaskReducer,
//     myRequestsReducer,
//     myTasksReducer,
//     taskDataFormattedReducer,
//     currentUserReducer,
//     locationReducer,
//     taskCategoryReducer,
//     addRequestModalReducer,
//     currentPageReducer,
//     modalRequestCardReducer,
//   }),
//   composeEnhancers(
//     applyMiddleware(thunk),
//   ),
// );

export default store;
