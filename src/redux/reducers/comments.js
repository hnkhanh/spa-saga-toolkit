import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    errMess: null,
    comments: [],
  },
  reducers: {
    getComments() {},
    setComments(state, action) {
      return { ...state, comments: action.payload };
    },
    commentsFailed(state, action) {
      return { ...state, errMess: action.payload};
    },
    addComment() {},
    theUpdateComment(state, action) {
      return { ...state, comments: state.comments.map(item => item.id === action.payload.id ? item = action.payload : item)}
    },
    updateComment() {},
    newComment(state, action) {
      return {...state, comments: [ ...state.comments, action.payload]}
    },
    deleteComment(state, action) {
      return { ...state, 
        comments: state.comments.filter( item => item.id !== action.payload)}
    },
  }
});

export const {addComment, getComments, setComments, commentsFailed, deleteComment, updateComment, newComment, theUpdateComment} = commentsSlice.actions

export default commentsSlice.reducer;
