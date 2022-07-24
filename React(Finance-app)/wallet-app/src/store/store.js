import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import reducerData from "./reducers/transactions/data";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/index";

const reducer = combineReducers({
  dataLoad: reducerData,
});
const sagaMidleware = createSagaMiddleware();

const initialState = {};

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk, sagaMidleware), devTools)
);
sagaMidleware.run(rootWatcher);
export default store;
