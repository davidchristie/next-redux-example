import React from "react";
import App from "../../pages/index";
import { renderConnectedComponent } from "../../test-utils";

describe("index page", () => {
  describe("With React Testing Library", () => {
    it('Shows "Index Page"', () => {
      const { result } = renderConnectedComponent(<App />);
      expect(result.getByText("Index Page")).not.toBeNull();
    });
  });

  describe("With React Testing Library Snapshot", () => {
    it("Should match Snapshot", () => {
      const { result } = renderConnectedComponent(<App />);
      expect(result.asFragment()).toMatchSnapshot();
    });
  });
});
