import IndexPage from "../../pages/index";
import {
  describeComponent,
  itShouldMatchSnapshot,
  itShowsText
} from "../../test-utils";

describeComponent(IndexPage, {}, getContext => {
  itShowsText(getContext, "Index Page");

  itShouldMatchSnapshot(getContext);
});
