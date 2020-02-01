import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Clock from "./Clock";
import Counter from "./Counter";
import { RootState } from "reducer";

interface Props {
  linkTo: string;
  navigateTo: string;
  title: string;
}

const Page: React.FunctionComponent<Props> = ({
  linkTo,
  navigateTo,
  title
}) => {
  const { error, lastUpdate, light, placeholderData } = useSelector<
    RootState,
    RootState
  >(state => state);
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

Page.displayName = "Page";

export default Page;
