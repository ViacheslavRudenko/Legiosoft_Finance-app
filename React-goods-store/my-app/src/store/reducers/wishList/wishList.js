import {
  getWishListFromLocalStorage,
  addProductToWishList,
  removeProductFromWishList,
} from "../../types";

let wishList = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];

const initialState = {
  wishList: [],
};

const reducer = (state = initialState.wishList, action) => {
  switch (action.type) {
    case getWishListFromLocalStorage: {
      return wishList;
    }

    case addProductToWishList: {
      if (wishList.includes(action.payload)) {
        return wishList;
      } else {
        wishList.push(action.payload);
        localStorage.setItem("wishList", JSON.stringify(wishList));
        return [...state, action.payload];
      }
    }

    case removeProductFromWishList: {
      const index = wishList.findIndex(
        (product) => product.article === action.payload.article
      );
      wishList.splice(wishList.indexOf(action.payload.article), 1);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      return state.filter(
        (product) => product.article !== action.payload.article
      );
    }

    default:
      return state;
  }
};
export default reducer;
