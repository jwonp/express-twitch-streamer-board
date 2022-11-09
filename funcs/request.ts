import axios from "axios";
const axiosForServer = require("axios").default;

export const reqGETbyClient = async (url: string): Promise<any> => {
  return await axios.get(url);
};

export const reqPOSTbyClient = async (
  url: string,
  data: any,
  headers?: any
) => {
  return await axios.post(url, data, {
    headers: headers,
  });
};

export const reqGETbyServer = async (url: string): Promise<any> => {
  return await axiosForServer.get(url);
};

export const reqPOSTbyServer = async (
  url: string,
  data: any,
  headers?: any
) => {
  return await axiosForServer.post(url, data, {
    headers: headers,
  });
};
// const ContentType = {
//   "form-data": { "Content-Type": "multipart/form-data;charset=utf-8" },
//   "app-json": { "Content-Type": "application/json" },
//   "x-w-form": { "Content-Type": "application/x-www-form-urlencoded" },
// };
// interface headers {
//   "Content-Type"?: "multipart/form-data;charset=utf-8" | "application/json" | "application/x-www-form-urlencoded";
//   Authorization?: string;
//   "Client-Id"?: string | number;
// }
