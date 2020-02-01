import { NextPage } from "next";
import React from "react";
import { useDispatch } from "react-redux";
import Page from "../components/Page";
import { loadData, startClock, tickClock } from "../actions";

interface Props {}

interface InitialProps {
  isServer: boolean;
}

const IndexPage: NextPage<Props, InitialProps> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startClock());
  }, []);
  return <Page title="Index Page" linkTo="/other" navigateTo="Other Page" />;
};

IndexPage.displayName = "IndexPage";

// FIXME: Remove any type
IndexPage.getInitialProps = async ({ ctx }: any) => {
  const { store, isServer } = ctx;
  store.dispatch(tickClock(Date.now(), isServer));
  if (!store.getState().placeholderData) {
    store.dispatch(loadData());
  }
  return { isServer };
};

export default IndexPage;
