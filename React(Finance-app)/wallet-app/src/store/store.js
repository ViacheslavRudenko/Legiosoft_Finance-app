import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import reducerData from "./reducers/transactions/data";
import thunk from "redux-thunk";

const reducer = combineReducers({
  dataLoad: reducerData,
});

const initialState = {};

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk), devTools)
);

export default store;
