import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import Clock from "./Clock";
import Counter from "./Counter";
import { RootState } from "reducer";

interface Props extends RootState {
  linkTo: string;
  navigateTo: string;
  title: string;
}

const Page: React.FunctionComponent<Props> = ({
  error,
  lastUpdate,
  light,
  linkTo,
  navigateTo,
  placeholderData,
  title
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <Counter />
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {navigateTo}</a>
        </Link>
      </nav>
      {placeholderData && (
        <pre>
          <code>{JSON.stringify(placeholderData, null, 2)}</code>
        </pre>
      )}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};

export default connect(state => state)(Page);
