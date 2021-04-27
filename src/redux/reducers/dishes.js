import { createSlice } from "@reduxjs/toolkit";

const dishesSlice = createSlice({
  name: "dishes",
  initialState: {
    isLoading: true,
    errMess: null,
    dishes: [],
  },
  reducers: {
    getDishes() {},
    setDishes(state, action) {
      return { ...state, dishes: action.payload, isLoading:false, errMess:null };
    },
    dishesFailed(state, action) {
      return { ...state, errMess: action.payload, isLoading:false };
    }
  }
});

export const { getDishes, setDishes, dishesFailed } = dishesSlice.actions;

export default dishesSlice.reducer;
