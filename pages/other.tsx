import { NextPage } from "next";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Page from "../components/Page";
import { startClock, tickClock } from "../actions";

interface Props {
  dispatch: Dispatch;
}

interface InitialProps {
  isServer: boolean;
}

const OtherPage: NextPage<Props, InitialProps> = ({ dispatch }) => {
  React.useEffect(() => {
    dispatch(startClock());
  }, []);
  return <Page title="Other Page" linkTo="/" navigateTo="Index Page" />;
};

// FIXME: Remove any type.
OtherPage.getInitialProps = async ({ ctx }: any) => {
  const { store, isServer } = ctx;
  store.dispatch(tickClock(isServer));
  return { isServer };
};

export default connect()(OtherPage);
