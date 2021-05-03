import { call, put, takeLatest } from "redux-saga/effects";
import {
  commentsFailed,
  setComments,
  getComments,
  addComment,
  deleteComment,
  updateComment,
  theNewComment,
  theUpdateComment,
} from "../../reducers/comments";
import { Api } from "../api/index";
import { newComment, UpdateComment } from "../../reducers/comments";

export function* handleGetComments() {
  try {
    const { data } = yield call(Api.getRequest, "comments");
    //pass the payload into dispatch function
    if (data) yield put(setComments([...data]));
  } catch (error) {
    let err = Api.handleRequestError(error);
    yield put(commentsFailed(err));
  }
}

export function* fetchCommentsWatcher() {
  yield takeLatest(getComments.type, handleGetComments);
}

export function* handlePostComment(action: {
  payload: newComment;
  type: string;
}) {
  try {
    const { data, status } = yield call(
      Api.postRequest,
      "comments",
      action.payload
    );
    if (status === 201) {
      yield put(theNewComment({ ...data }));
    }
  } catch (error) {
    let err = Api.handleRequestError(error);
    yield put(commentsFailed(err));
  }
}

export function* postCommentsWatcher() {
  yield takeLatest(addComment.type, handlePostComment);
}

export function* handleDeleteComment(action: {
  payload: number;
  type: string;
}) {
  try {
    yield call(Api.deleteRequest, "comments", action.payload);
  } catch (error) {
    let err = Api.handleRequestError(error);
    yield put(commentsFailed(err));
  }
}

export function* deleteCommentWatcher() {
  yield takeLatest(deleteComment.type, handleDeleteComment);
}

export function* handleUpdateComment(action: {
  payload: UpdateComment;
  type: string;
}) {
  try {
    const { data, status } = yield call(
      Api.patchRequest,
      "comments",
      action.payload.id,
      action.payload
    );
    if (status === 200) {
      yield put(theUpdateComment({ ...data }));
    }
  } catch (error) {
    let err = Api.handleRequestError(error);
    yield put(commentsFailed(err));
  }
}

export function* updateCommentWatcher() {
  console.log("begin of update watcher");
  yield takeLatest(updateComment.type, handleUpdateComment);
}
