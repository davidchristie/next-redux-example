import React from "react";
import { Provider } from "react-redux";
import { createStore, Dispatch, Store, Action } from "redux";
import { render } from "@testing-library/react";
import { exampleInitialState, RootState } from "./reducer";

type Context = ReturnType<typeof renderConnectedComponent>;

type GetContext = () => Context;

const createWrapper = (initialState: RootState) => {
  const reducer = (state = initialState) => state;
  const store = createStore(reducer);
  const dispatch = mockDispatch(store);
  const Wrapper: React.FunctionComponent = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return { dispatch, Wrapper };
};

const mockDispatch = (store: Store): jest.Mock<Dispatch> => {
  const dispatch = jest.fn(store.dispatch);
  store.dispatch = dispatch;
  return dispatch;
};

const renderConnectedComponent = (
  element: React.ReactElement,
  { initialState = exampleInitialState } = {}
) => {
  const { dispatch, Wrapper } = createWrapper(initialState);
  const result = render(element, {
    wrapper: Wrapper
  });
  return { dispatch, result };
};

export const describeComponent = <P extends {}>(
  Component: React.ComponentType<P>,
  props: P,
  fn: (getContext: GetContext) => void
) => {
  describe(`${Component.displayName} Component`, () => {
    let context: Context;

    beforeEach(() => {
      context = renderConnectedComponent(<Component {...props} />);
    });

    it("Has display name", () => {
      expect(Component.displayName).toBeDefined();
    });

    fn(() => context);
  });
};

export const describeComponentWithReduxState = <P extends {}>(
  Component: React.ComponentType<P>,
  props: P,
  state: Partial<RootState>,
  fn: (getContext: GetContext) => void
) => {
  describe(`${Component.displayName} with Redux state: ${JSON.stringify(
    state
  )}`, () => {
    let context: Context;

    beforeEach(() => {
      context = renderConnectedComponent(<Component {...props} />, {
        initialState: { ...exampleInitialState, ...state }
      });
    });

    fn(() => context);
  });
};

export const describeWhenButtonIsClicked = (
  getContext: GetContext,
  text: string,
  fn: (getContext: GetContext) => void
) => {
  describe(`When "${text}" button is clicked`, () => {
    let context: Context;

    beforeEach(() => {
      context = getContext();
      const button = context.result.getByText(text, {
        selector: "button"
      });
      button.click();
    });

    fn(() => context);
  });
};

export const itHasLink = (
  getContext: GetContext,
  text: string,
  href: string
) => {
  it(`Has link "${text}" to "${href}"`, () => {
    const { result } = getContext();
    expect(
      result.getByText(text, {
        selector: `a[href="${href}"]`
      })
    ).not.toBeNull();
  });
};

export const itShouldDispatchAction = (
  getContext: GetContext,
  action: Action
) => {
  it(`Dispatches "${action.type}" action`, () => {
    const { dispatch } = getContext();
    expect(dispatch).toBeCalledWith(action);
  });
};

export const itShouldMatchSnapshot = (getContext: GetContext) => {
  it("Should match snapshot", () => {
    const { result } = getContext();
    expect(result.asFragment()).toMatchSnapshot();
  });
};

export const itShowsText = (getContext: GetContext, text: string) => {
  it(`Shows "${text}"`, () => {
    const { result } = getContext();
    expect(result.getByText(text)).not.toBeNull();
  });
};
