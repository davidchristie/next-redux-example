import {
  loadDataSuccess,
  decrement,
  failure,
  increment,
  reset,
  tickClock
} from "../actions";
import rootReducer, { exampleInitialState } from "../reducer";
import { itShouldHaveNextState } from "../test-utils";

describe("Root Reducer", () => {
  describe("Initial state", () => {
    it("Should match snapshot", () => {
      const initialState = rootReducer(undefined, { type: "@@INIT" });
      expect(initialState).toMatchSnapshot();
    });
  });

  describe("After Failure", () => {
    const error = new Error("TEST ERROR");

    itShouldHaveNextState("Should store the error", {
      action: failure(error),
      expectedNextState: {
        ...exampleInitialState,
        error
      },
      previousState: exampleInitialState,
      reducer: rootReducer
    });
  });

  describe("After Increment", () => {
    itShouldHaveNextState("Should increase count by 1", {
      action: increment(),
      expectedNextState: {
        ...exampleInitialState,
        count: exampleInitialState.count + 1
      },
      previousState: exampleInitialState,
      reducer: rootReducer
    });
  });

  describe("After Decrement", () => {
    itShouldHaveNextState("Should reduce count by 1", {
      action: decrement(),
      expectedNextState: {
        ...exampleInitialState,
        count: exampleInitialState.count - 1
      },
      previousState: exampleInitialState,
      reducer: rootReducer
    });
  });

  describe("After Reset", () => {
    itShouldHaveNextState("Should set count to initial value", {
      action: reset(),
      expectedNextState: {
        ...exampleInitialState,
        count: exampleInitialState.count
      },
      previousState: {
        ...exampleInitialState,
        count: 123
      },
      reducer: rootReducer
    });
  });

  describe("After Data Load Success", () => {
    const placeholderData = [{ id: 1 }, { id: 2 }, { id: 3 }];

    itShouldHaveNextState("Should store the data", {
      action: loadDataSuccess(placeholderData),
      expectedNextState: {
        ...exampleInitialState,
        placeholderData
      },
      previousState: exampleInitialState,
      reducer: rootReducer
    });
  });

  describe("After Clock Tick", () => {
    const timestamp = 1580554431955;

    describe("On Client", () => {
      const isServer = false;

      itShouldHaveNextState("Should update the timestamp and turn on light", {
        action: tickClock(timestamp, isServer),
        expectedNextState: {
          ...exampleInitialState,
          lastUpdate: timestamp,
          light: true
        },
        previousState: exampleInitialState,
        reducer: rootReducer
      });
    });

    describe("On Server", () => {
      const isServer = true;

      itShouldHaveNextState("Should update the timestamp and turn off light", {
        action: tickClock(timestamp, isServer),
        expectedNextState: {
          ...exampleInitialState,
          lastUpdate: timestamp,
          light: false
        },
        previousState: exampleInitialState,
        reducer: rootReducer
      });
    });
  });
});
