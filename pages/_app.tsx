import App, { AppContext } from "next/app";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { createReduxStore } from "../store";

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      // FIXME: Remove any type.
      pageProps = await Component.getInitialProps({ ctx } as any);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(createReduxStore)(withReduxSaga(MyApp));
