import { createReduxStore } from "../store";
import { describeAllEnvironments, itShouldHaveMethod } from "../test-utils";

describeAllEnvironments(() => {
  describe("Redux Store", () => {
    const store = createReduxStore();

    itShouldHaveMethod(store, "dispatch");

    itShouldHaveMethod(store, "getState");

    itShouldHaveMethod(store, "subscribe");

    itShouldHaveMethod(store, "replaceReducer");
  });
});
