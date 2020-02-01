import { Reducer, AnyAction } from "redux";

export const itShouldHaveNextState = <S extends {}>(
  name: string,
  {
    action,
    expectedNextState,
    previousState,
    reducer
  }: {
    action: AnyAction;
    expectedNextState: S;
    previousState: S;
    reducer: Reducer<S>;
  }
) => {
  it(name, () => {
    const actualNextState = reducer(previousState, action);
    expect(actualNextState).toEqual(expectedNextState);
  });
};
