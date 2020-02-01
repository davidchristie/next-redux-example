import es6promise from "es6-promise";
import "isomorphic-unfetch";
import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import { actionTypes, failure, loadDataSuccess, tickClock } from "./actions";

es6promise.polyfill();

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield put(tickClock(Date.now(), false));
    yield delay(1000);
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

export function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  ]);
}
