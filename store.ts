import { Action, applyMiddleware, createStore, Middleware } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import rootReducer, { exampleInitialState, RootState } from "./reducer";
import rootSaga from "./saga";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const createReduxStore = (
  initialState: RootState = exampleInitialState
) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore<
    RootState,
    Action<unknown>,
    { sagaTask: Task },
    unknown
  >(rootReducer, initialState, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
