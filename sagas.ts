import es6promise from "es6-promise";
import "isomorphic-unfetch";
import {
  all,
  call,
  delay,
  put,
  select,
  take,
  takeLatest
} from "redux-saga/effects";
import { getUsers } from "./pages/api/users";
import { actionTypes, failure, loadDataSuccess, tickClock } from "./actions";

es6promise.polyfill();

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  const data = await response.json();
  return data;
};

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield put(tickClock(Date.now(), false));
    yield delay(1000);
  }
}

function* loadDataSaga() {
  try {
    const isServer = yield select(state => state.isServer);
    const data = yield isServer ? yield getUsers() : fetchData("/api/users");
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
