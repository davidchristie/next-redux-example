import { NextPageContext } from "next";
import IndexPage from "../../pages/index";
import {
  describeComponent,
  itShouldDispatchAction,
  itShouldMatchSnapshot,
  itShowsText,
  mockDispatch
} from "../../test-utils";
import { startClock } from "../../actions";
import { exampleInitialState } from "../../reducer";
import { createReduxStore } from "../../store";

describeComponent(IndexPage, {}, getContext => {
  itShowsText(getContext, "Index Page");

  itShouldMatchSnapshot(getContext);

  itShouldDispatchAction(getContext, startClock());

  describe("Initial Props", () => {
    it("Should match snapshot", async () => {
      const initialProps = await IndexPage.getInitialProps!({
        AppTree: () => null,
        ctx: {
          store: createReduxStore(),
          isServer: false
        },
        pathname: "/",
        query: {}
      } as NextPageContext);
      expect(initialProps).toMatchSnapshot();
    });

    describe("If data has already been loaded", () => {
      it("Should match snapshot", async () => {
        const initialState = {
          ...exampleInitialState,
          placeholderData: [{ id: 1 }, { id: 2 }, { id: 3 }]
        };
        const store = createReduxStore(initialState);
        mockDispatch(store);
        const initialProps = await IndexPage.getInitialProps!({
          AppTree: () => null,
          ctx: {
            store,
            isServer: false
          },
          pathname: "/",
          query: {}
        } as NextPageContext);
        expect(initialProps).toMatchSnapshot();
      });
    });
  });
});
