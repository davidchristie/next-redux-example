import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import { exampleInitialState } from "./reducer";

export const createWrapper = initialState => {
  const reducer = (state = initialState) => state;
  const store = createStore(reducer);
  const Wrapper: React.FunctionComponent = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { Wrapper };
};

export const renderConnectedComponent = (
  element: React.ReactElement,
  { initialState = exampleInitialState } = {}
) => {
  const { Wrapper } = createWrapper(initialState);
  const result = render(element, {
    wrapper: Wrapper
  });
  return { result };
};
