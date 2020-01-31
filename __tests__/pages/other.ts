import OtherPage from "../../pages/other";
import {
  describeComponent,
  itShouldMatchSnapshot,
  itShowsText
} from "../../test-utils";

describeComponent(OtherPage, {}, getContext => {
  itShowsText(getContext, "Other Page");

  itShouldMatchSnapshot(getContext);
});
