import Page from "../../components/Page";
import {
  describeComponent,
  describeComponentWithReduxState,
  itHasLink,
  itShouldMatchSnapshot,
  itShowsText
} from "../../test-utils";

describe("With test link", () => {
  const linkTo = "/test/link";
  const navigateTo = "Test Link";
  const title = "Test Title";

  describeComponent(Page, { linkTo, navigateTo, title }, getContext => {
    itShowsText(getContext, title);

    itHasLink(getContext, `Navigate: ${navigateTo}`, linkTo);

    itShouldMatchSnapshot(getContext);
  });

  describeComponentWithReduxState(
    Page,
    { linkTo, navigateTo, title },
    { placeholderData: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    getContext => {
      itShouldMatchSnapshot(getContext);
    }
  );

  describeComponentWithReduxState(
    Page,
    { linkTo, navigateTo, title },
    { error: new Error("Test error message.") },
    getContext => {
      itShouldMatchSnapshot(getContext);
    }
  );
});
