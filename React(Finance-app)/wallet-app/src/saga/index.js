import { all } from "redux-saga/effects";
import { dataWatcher } from "./transactionSaga";

export function* rootWatcher() {
  yield all([dataWatcher()]);
}
