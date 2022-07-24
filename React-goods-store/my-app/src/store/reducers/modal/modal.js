import { setModalType } from "../../types";

const initialState = {
  modal: [],
};

const reducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case setModalType: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default reducer;
