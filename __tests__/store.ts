import { Store } from "redux";
import { actionTypes, loadData, startClock } from "../actions";
import { RootState, exampleInitialState } from "../reducer";
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

describe("Sagas", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = createReduxStore();
  });

  describe(`When ${actionTypes.LOAD_DATA} action is dispatched`, () => {
    const placeholderData = [{ id: 1 }, { id: 2 }, { id: 3 }];

    beforeEach(async () => {
      const mockResponse = {
        json: () => Promise.resolve(placeholderData)
      } as Response;
      jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);
      store.dispatch(loadData());
    });

    it("Should fetch data from the API", () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith("/api/users", undefined);
      expect(store.getState().placeholderData).toBe(placeholderData);
    });

    describe("On the server from remote service", () => {
      beforeEach(() => {
        store = createReduxStore({ isServer: true });
        store.dispatch(loadData());
      });

      it("Should fetch data from remote service", async () => {
        expect(window.fetch).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users"
        );
        await new Promise(setImmediate);
        expect(store.getState().placeholderData).toBe(placeholderData);
      });
    });

    describe("If the request fails", () => {
      const error = new Error("TEST ERROR");

      beforeEach(async () => {
        jest.spyOn(window, "fetch").mockRejectedValueOnce(error);
        store.dispatch(loadData());
      });

      it("Should store the error", async () => {
        expect(store.getState().error).toBe(error);
      });
    });
  });

  describe(`When ${actionTypes.START_CLOCK} action is dispatched`, () => {
    beforeEach(() => {
      store.dispatch(startClock());
    });

    it("Should update the timestamp", async () => {
      expect(store.getState().lastUpdate).not.toEqual(
        exampleInitialState.lastUpdate
      );
    });
  });
});
