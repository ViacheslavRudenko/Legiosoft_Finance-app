import { getData } from "../../../Api/api";

import {
  getDataRequested,
  getDataSuccess,
  getDataError,
  deleteData,
  getNewDataItem,
  editDataValue,
} from "../../types";

// const setReques = (request) => {
//   return { type: getDataRequested, payload: request };
// };
// const setData = (data) => {
//   return { type: getDataSuccess, payload: data };
// };
// const setError = (error) => {
//   return { type: getDataError, payload: error };
// };
const deleteItem = (data) => {
  return { type: deleteData, payload: data };
};
const getNewData = (data) => {
  return { type: getNewDataItem, payload: data };
};
const editData = (data) => {
  return { type: editDataValue, payload: data };
};

const axiosData = () => {
  return async (dispatch) => {
    await getData()
      .then((response) => {
        const isLoaded = response.status === 200;
        isLoaded && dispatch(setReques(true));
        isLoaded && dispatch(setData(response.data));
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export { axiosData, deleteItem, getNewData, editData };
