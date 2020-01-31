import Clock from "../../components/Clock";
import {
  describeComponent,
  itShouldMatchSnapshot,
  itShowsText
} from "../../test-utils";

describe("At 18:05:31", () => {
  const lastUpdate = new Date(
    "Fri Jan 31 2020 19:05:31 GMT+0100 (Central European Standard Time)"
  ).getTime();

  describeComponent(Clock, { lastUpdate, light: false }, getContext => {
    itShowsText(getContext, "18:05:31");

    itShouldMatchSnapshot(getContext);
  });

  describe("Light", () => {
    describeComponent(Clock, { lastUpdate, light: true }, getContext => {
      itShowsText(getContext, "18:05:31");

      itShouldMatchSnapshot(getContext);
    });
  });
});
