import "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "GET") {
    const users = await getUsers();
    return response.json(users);
  }
};
