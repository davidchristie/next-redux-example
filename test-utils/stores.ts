import { Dispatch, Store } from "redux";

export const mockDispatch = (store: Store): jest.Mock<Dispatch> => {
  const dispatch = jest.fn(store.dispatch);
  store.dispatch = dispatch;
  return dispatch;
};
