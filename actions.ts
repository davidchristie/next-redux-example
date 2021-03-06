export const actionTypes = {
  FAILURE: "FAILURE",
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  LOAD_DATA: "LOAD_DATA",
  LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
  START_CLOCK: "START_CLOCK",
  TICK_CLOCK: "TICK_CLOCK"
};

export function failure(error: Error) {
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function increment() {
  return { type: actionTypes.INCREMENT };
}

export function decrement() {
  return { type: actionTypes.DECREMENT };
}

export function reset() {
  return { type: actionTypes.RESET };
}

export function loadData() {
  return { type: actionTypes.LOAD_DATA };
}

// FIXME: Remove any type.
export function loadDataSuccess(data: any) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  };
}

export function startClock() {
  return { type: actionTypes.START_CLOCK };
}

export function tickClock(timestamp: number, isServer: boolean) {
  return {
    type: actionTypes.TICK_CLOCK,
    light: !isServer,
    timestamp
  };
}
