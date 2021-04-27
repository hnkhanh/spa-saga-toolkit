import { createSlice } from "@reduxjs/toolkit";

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    isLoading: true,
    errMess: null,
    promotions: [],
  },
  reducers: {
    getPromotions() {},
    setPromotions(state, action) {
      return { ...state, promotions: action.payload, isLoading:false, errMess:null };
    },
    promotionsFailed(state, action) {
      return { ...state, errMess: action.payload, isLoading:false };
    }
  }
});

export const { getPromotions, setPromotions, promotionsFailed } = promotionsSlice.actions;

export default promotionsSlice.reducer;
