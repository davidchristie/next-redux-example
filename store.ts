import { Action, applyMiddleware, createStore, Middleware } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import rootReducer, { exampleInitialState, RootState } from "./reducer";
import { rootSaga } from "./sagas";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const createReduxStore = (initialState: Partial<RootState> = {}) => {
  const preloadedState = {
    ...exampleInitialState,
    ...initialState
  };
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore<
    RootState,
    Action<unknown>,
    { sagaTask: Task },
    unknown
  >(rootReducer, preloadedState, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
