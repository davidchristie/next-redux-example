import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { startClock, tickClock } from "../actions";
import Page from "../components/Page";

interface Props {
  dispatch: Dispatch;
}

class OtherPage extends React.Component<Props> {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx;
    store.dispatch(tickClock(isServer));
    return { isServer };
  }

  componentDidMount() {
    this.props.dispatch(startClock());
  }

  render() {
    return <Page title="Other Page" linkTo="/" navigateTo="Index Page" />;
  }
}

export default connect()(OtherPage);
