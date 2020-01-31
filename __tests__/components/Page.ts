import Page from "../../components/Page";
import {
  describeComponent,
  describeComponentWithReduxState,
  itHasLink,
  itShouldMatchSnapshot
} from "../../test-utils";

describe("With test link", () => {
  const linkTo = "/test/link";
  const navigateTo = "Test Link";

  describeComponent(Page, { linkTo, navigateTo }, getContext => {
    itHasLink(getContext, `Navigate: ${navigateTo}`, linkTo);

    itShouldMatchSnapshot(getContext);
  });

  describeComponentWithReduxState(
    Page,
    { linkTo, navigateTo },
    { placeholderData: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    getContext => {
      itShouldMatchSnapshot(getContext);
    }
  );

  describeComponentWithReduxState(
    Page,
    { linkTo, navigateTo },
    { error: new Error("Test error message.") },
    getContext => {
      itShouldMatchSnapshot(getContext);
    }
  );
});
