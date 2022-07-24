import { put, takeEvery, call } from "redux-saga/effects";
import { getData } from "../Api/api";
import { axiosGetData } from "../store/types";
import {
  getDataTransactions,
  getDataTransactionsRequest,
  getDataTransactionsError,
} from "../store/reducers/transactions/data";

function* axiosDataWorker() {
  const data = yield call(getData);
  yield put(getDataTransactions(data.data));
  yield put(getDataTransactionsRequest(data.status === 200));
  yield put(getDataTransactionsError(data.status !== 200));
}

export function* dataWatcher() {
  yield takeEvery(axiosGetData, axiosDataWorker);
}
