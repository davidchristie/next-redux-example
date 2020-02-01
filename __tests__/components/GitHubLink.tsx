import GitHubLink from "../../components/GitHubLink";
import {
  describeComponent,
  itHasLink,
  itShouldMatchSnapshot
} from "../../test-utils";

describeComponent(GitHubLink, {}, getContext => {
  itHasLink(
    getContext,
    "GitHub",
    "https://github.com/davidchristie/next-redux-example"
  );

  itShouldMatchSnapshot(getContext);
});
