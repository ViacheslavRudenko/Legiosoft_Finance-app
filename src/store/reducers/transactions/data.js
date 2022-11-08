import {
  getDataRequested,
  getDataSuccess,
  getDataError,
  deleteData,
  getNewDataItem,
  editDataValue,
  axiosGetData,
} from "../../types";

let initialState = {
  isLoaded: false,
  hasError: [],
  data: [],
};

const reducerData = (state = initialState, action) => {
  switch (action.type) {
    case getDataRequested: {
      return { ...state, isLoaded: action.payload };
    }
    case getDataSuccess: {
      return { ...state, data: action.payload };
    }
    case getDataError: {
      return { ...state, hasError: action.payload };
    }
    case deleteData: {
      return {
        ...state,
        data: state.data.filter(
          (dataItme) => dataItme.TransactionId !== action.payload
        ),
      };
    }
    case getNewDataItem: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case editDataValue: {
      return {
        ...state,
        data: state.data.map((dataItem) =>
          dataItem.TransactionId === action.payload.TransactionId
            ? (dataItem = action.payload)
            : dataItem
        ),
      };
    }

    default:
      return state;
  }
};
export default reducerData;

export const getDataTransactions = (payload) => ({
  type: getDataSuccess,
  payload,
});

export const getDataTransactionsRequest = (payload) => ({
  type: getDataRequested,
  payload,
});
export const getDataTransactionsError = (payload) => ({
  type: getDataError,
  payload,
});
export const axiosData = () => ({ type: axiosGetData });
