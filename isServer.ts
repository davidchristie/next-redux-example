let value = typeof window === "undefined";

const isServer = () => value;

export const setServer = (isServer: boolean) => {
  value = isServer;
};

export default isServer;
