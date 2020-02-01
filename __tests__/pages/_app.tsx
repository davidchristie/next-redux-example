import { AppProps } from "next/app";
import { Router } from "next/dist/client/router";
import App, { AppContent } from "../../pages/_app";
import { describeComponent, itShouldMatchSnapshot } from "../../test-utils";
import { NextComponentType } from "next/dist/next-server/lib/utils";

describeComponent<AppProps>(
  App,
  { Component: () => null, pageProps: {}, router: {} as Router },
  getContext => {
    itShouldMatchSnapshot(getContext);

    describe("Initial Props", () => {
      it("Should match snapshot", async () => {
        const Component: NextComponentType = () => null;
        const initialProps = await AppContent.getInitialProps!({
          AppTree: () => null,
          Component,
          ctx: {} as any,
          router: {} as Router
        });
        expect(initialProps).toMatchSnapshot();
      });

      describe("If Component has getInitialProps static method", () => {
        it("Should match snapshot", async () => {
          const Component: NextComponentType = () => null;
          Component.getInitialProps = () => Promise.resolve({});
          const initialProps = await AppContent.getInitialProps!({
            AppTree: () => null,
            Component,
            ctx: {} as any,
            router: {} as Router
          });
          expect(initialProps).toMatchSnapshot();
        });
      });
    });
  }
);
