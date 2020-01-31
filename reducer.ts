import { actionTypes } from "./actions";

export interface RootState {
  count: number;
  error: Error | undefined;
  lastUpdate: number;
  light: boolean;
  placeholderData: any | null;
}

export const exampleInitialState: RootState = {
  count: 0,
  error: undefined,
  lastUpdate: 0,
  light: false,
  placeholderData: null
};

function reducer(state: RootState = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 }
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 }
      };

    case actionTypes.RESET:
      return {
        ...state,
        ...{ count: exampleInitialState.count }
      };

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.data }
      };

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light }
      };

    default:
      return state;
  }
}

export default reducer;
