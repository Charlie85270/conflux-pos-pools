import qs from "query-string";
import fetch from "./request";

export const v1Prefix = "/v1";
export const statPrefix = "/stat";

const conflux_url = "https://www.confluxscan.org";

export const sendRequest = config => {
  const url =
    config.url.startsWith("/stat") || config.url.startsWith("http")
      ? config.url
      : `${v1Prefix}${
          config.url.startsWith("/") ? config.url : "/" + config.url
        }`;
  return fetch(
    qs.stringifyUrl({ url: conflux_url + url, query: config.query }),
    {
      method: config.type || "GET",
      body: config.body,
      headers: config.headers,
    }
  );
};

export const reqContract = (contract: string) => {
  return sendRequest({
    url: `/contract/${contract}?fields=verifyInfo`,
  });
};

export const reqHomeDashboardOfPOSSummary = (extra?: object) => {
  return sendRequest({
    url: `/stat/pos-info`,
    ...extra,
  });
};
