import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/configureStore";
import { comment } from "../../components/DishDetailComponent";

export type newComment = {
  dishId: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
};

export type UpdateComment = {
  rating: number;
  author: string;
  comment: string;
  id: number;
};

interface commentsState {
  errMess: string | null;
  comments: comment[];
}

const initialState: commentsState = {
  errMess: null,
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getComments() {},
    setComments(state, action) {
      return { ...state, comments: action.payload };
    },
    commentsFailed(state, action) {
      return { ...state, errMess: action.payload };
    },
    addComment(_, { payload }: PayloadAction<newComment>) {},
    theUpdateComment(state, action) {
      return {
        ...state,
        comments: state.comments.map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item
        ),
      };
    },
    updateComment(action, { payload }: PayloadAction<UpdateComment>) {},
    theNewComment(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },
    deleteComment(state, action: PayloadAction<number>) {
      return {
        ...state,
        comments: state.comments.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const {
  addComment,
  getComments,
  setComments,
  commentsFailed,
  deleteComment,
  updateComment,
  theNewComment,
  theUpdateComment,
} = commentsSlice.actions;

export const comments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
