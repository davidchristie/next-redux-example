import Counter from "../../components/Counter";
import { decrement, increment, reset } from "../../actions";
import {
  describeComponent,
  describeWhenButtonIsClicked,
  itShouldDispatchAction,
  itShowsText,
  itShouldMatchSnapshot
} from "../../test-utils";

describeComponent(Counter, {}, getContext => {
  itShowsText(getContext, "Count:");

  itShowsText(getContext, "0");

  itShouldMatchSnapshot(getContext);

  describeWhenButtonIsClicked(getContext, "+1", getContext => {
    itShouldDispatchAction(getContext, increment());
  });

  describeWhenButtonIsClicked(getContext, "-1", getContext => {
    itShouldDispatchAction(getContext, decrement());
  });

  describeWhenButtonIsClicked(getContext, "Reset", getContext => {
    itShouldDispatchAction(getContext, reset());
  });
});
