import { NextPage } from "next";
import React from "react";
import { useDispatch } from "react-redux";
import Page from "../components/Page";
import { startClock, tickClock } from "../actions";

interface Props {}

interface InitialProps {
  isServer: boolean;
}

const OtherPage: NextPage<Props, InitialProps> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startClock());
  }, []);
  return <Page title="Other Page" linkTo="/" navigateTo="Index Page" />;
};

OtherPage.displayName = "OtherPage";

// FIXME: Remove any type.
OtherPage.getInitialProps = async ({ ctx }: any) => {
  const { store, isServer } = ctx;
  store.dispatch(tickClock(isServer));
  return { isServer };
};

export default OtherPage;
