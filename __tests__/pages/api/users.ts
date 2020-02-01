import { NextApiRequest, NextApiResponse } from "next";
import usersHandler from "../../../pages/api/users";

describe("GET /api/users", () => {
  const users = [{ id: 1 }, { id: 2 }, { id: 2 }];

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockResolvedValue({
      json: () => Promise.resolve(users)
    } as Response);
  });

  it("Should fetch data from remote service", async () => {
    const request = {
      method: "GET"
    } as NextApiRequest;
    const response = { json: jest.fn() as any } as NextApiResponse;
    usersHandler(request, response);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    await new Promise(setImmediate);
    expect(response.json).toHaveBeenCalledWith(users);
  });

  describe("If the method isn't GET", () => {
    it("Doesn't call all any methods on the Response instance", () => {
      const request = {} as NextApiRequest;
      const response = {} as NextApiResponse;
      usersHandler(request, response);
    });
  });
});
