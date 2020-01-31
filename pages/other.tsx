import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { startClock, tickClock } from "../actions";
import Page from "../components/page";

interface Props {
  dispatch: Dispatch;
}

class Other extends React.Component<Props> {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx;
    store.dispatch(tickClock(isServer));
    return { isServer };
  }

  componentDidMount() {
    this.props.dispatch(startClock());
  }

  render() {
    return <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />;
  }
}

export default connect()(Other);
