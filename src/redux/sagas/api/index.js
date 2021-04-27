import axios from "axios";
import handleRequestError from './handleRequestError';

// export const baseUrl = 'https://my-json-server.typicode.com/hnkhanh/spa-db/'
const baseUrl = 'http://localhost:8000/';

export const getRequest = async endpoint => {
  const res = await axios.get(baseUrl + endpoint)
  return res
}

export const postRequest = async (endpoint, newItem) => {
  const res = await axios.post(baseUrl + endpoint, newItem);
  return res
}

export const deleteRequest = async (endpoint, deleteItemId) => {
  const res = await axios.delete(baseUrl + endpoint + `/${deleteItemId}`)
  return res.status === 200
}

export const patchRequest = async (endpoint, updatingItemId, updatingItem) => {
  const res = await axios.patch(baseUrl + endpoint + `/${updatingItemId}`, updatingItem)
  return res
}

export const Api = {
  handleRequestError,
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
}
