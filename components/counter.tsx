import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { increment, decrement, reset } from "../actions";

interface Props {
  count: number;
  dispatch: Dispatch;
}

const Counter: React.FunctionComponent<Props> = ({ count, dispatch }) => {
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

const mapStateToProps = ({ count }) => ({ count });

export default connect(mapStateToProps)(Counter);
