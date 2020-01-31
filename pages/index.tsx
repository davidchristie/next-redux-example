import { NextPage } from "next";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Page from "../components/Page";
import { loadData, startClock, tickClock } from "../actions";

interface Props {
  dispatch: Dispatch;
}

interface InitialProps {
  isServer: boolean;
}

const IndexPage: NextPage<Props, InitialProps> = ({ dispatch }) => {
  React.useEffect(() => {
    dispatch(startClock());
  }, []);
  return <Page title="Index Page" linkTo="/other" navigateTo="Other Page" />;
};

// FIXME: Remove any type
IndexPage.getInitialProps = async ({ ctx }: any) => {
  const { store, isServer } = ctx;
  store.dispatch(tickClock(isServer));
  if (!store.getState().placeholderData) {
    store.dispatch(loadData());
  }
  return { isServer };
};

export default connect()(IndexPage);
