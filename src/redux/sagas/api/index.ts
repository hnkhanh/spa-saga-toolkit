import axios from "axios";
import handleRequestError from "./handleRequestError";

// export const baseUrl = 'https://my-json-server.typicode.com/hnkhanh/spa-db/'
const baseUrl = "http://localhost:8000/";

export type newItem = {
  dishId: number;
  rating: number;
  author: string | number;
  comment: string;
  date: string;
};

type updatingItem = {
  rating: number;
  author: string | number;
  comment: string;
};

export const getRequest = async (endpoint: string) => {
  const res = await axios.get(baseUrl + endpoint);
  return res;
};

export const postRequest = async (endpoint: string, newItem: newItem) => {
  const res = await axios.post(baseUrl + endpoint, newItem);
  return res;
};

export const deleteRequest = async (endpoint: string, deleteItemId: number) => {
  const res = await axios.delete(baseUrl + endpoint + `/${deleteItemId}`);
  return res.status === 200;
};

export const patchRequest = async (
  endpoint: string,
  updatingItemId: number,
  updatingItem: updatingItem
) => {
  const res = await axios.patch(
    baseUrl + endpoint + `/${updatingItemId}`,
    updatingItem
  );
  return res;
};

export const Api = {
  handleRequestError,
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
};
