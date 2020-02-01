import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../actions";
import { RootState } from "../reducer";

const Counter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>(state => state.count);
  const onIncrementClick = () => dispatch(increment());
  const onDecrementClick = () => dispatch(decrement());
  const onResetClick = () => dispatch(reset());
  return (
    <div>
      <style jsx>{`
        div {
          padding: 0 0 20px 0;
        }
      `}</style>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={onIncrementClick}>+1</button>
      <button onClick={onDecrementClick}>-1</button>
      <button onClick={onResetClick}>Reset</button>
    </div>
  );
};

Counter.displayName = "Counter";

export default Counter;
