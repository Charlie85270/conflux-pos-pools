import { Conflux } from "js-conflux-sdk";

export const UseConflux = (): { conflux: Conflux } => {
  // initialize a Conflux object
  const conflux = new Conflux({
    url: "https://main.confluxrpc.com",
    networkId: 1029, // networkId is also need to pass
  });

  return {
    conflux,
  };
};
