import { NextPageContext } from "next";
import OtherPage from "../../pages/other";
import {
  describeComponent,
  itShouldMatchSnapshot,
  itShowsText
} from "../../test-utils";
import { createReduxStore } from "../../store";

describeComponent(OtherPage, {}, getContext => {
  itShowsText(getContext, "Other Page");

  itShouldMatchSnapshot(getContext);

  describe("Initial Props", () => {
    it("Should match snapshot", async () => {
      const initialProps = await OtherPage.getInitialProps!({
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
  });
});
