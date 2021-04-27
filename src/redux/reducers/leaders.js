import { createSlice } from "@reduxjs/toolkit";

const leadersSlice = createSlice({
  name: "leaders",
  initialState: {
    isLoading: true,
    errMess: null,
    leaders: [],
  },
  reducers: {
    getLeaders() {},
    setLeaders(state, action) {
      return { ...state, leaders: action.payload, isLoading:false, errMess:null };
    },
    leadersFailed(state, action) {
      return { ...state, errMess: action.payload, isLoading:false };
    }
  }
});

export const { getLeaders, setLeaders, leadersFailed } = leadersSlice.actions;

export default leadersSlice.reducer;
