import { call, put, takeLatest} from "redux-saga/effects";
import { commentsFailed, setComments, getComments, addComment, deleteComment, updateComment, newComment, theUpdateComment } from "../../reducers/comments";
import { Api } from "../api";

export function* handleGetComments(action) {
  try {
    const {data} = yield call(Api.getRequest, 'comments');
    //pass the payload into dispatch function
    if (data) yield put(setComments( [...data] ))
  } catch (error) {
    let err = Api.handleRequestError(error)
    yield put(commentsFailed(err))
  }
}

export default function* fetchCommentsWatcher() {
  yield takeLatest(getComments.type, handleGetComments);
}

export function* handlePostComment(action) {
  try { 
    const {data, status} = yield call(Api.postRequest, "comments", action.payload)
    if (status === 201) {
      yield put (newComment({...data}))
    } 
  } catch (error) {
    let err = Api.handleRequestError(error)
    yield put(commentsFailed(err))
  }
}

export function* postCommentsWatcher() {
  yield takeLatest(addComment.type, handlePostComment);
}

export function* handleDeleteComment(action) {
  try {
    yield call(Api.deleteRequest, "comments", action.payload)
  } catch (error) {
    let err = Api.handleRequestError(error)
    yield put(commentsFailed(err))
  }
}

export function* deleteCommentWatcher() {
  yield takeLatest(deleteComment.type, handleDeleteComment);
}

export function* handleUpdateComment(action) {
  try {
    const {data, status} = yield call(Api.patchRequest, "comments", action.payload.id, action.payload)
    if (status === 200) {
      yield put (theUpdateComment({...data}))
    } 
  } catch (error) {
    let err = Api.handleRequestError(error)
    yield put(commentsFailed(err))
  }
}

export function* updateCommentWatcher() {
  console.log('begin of update watcher')
  yield takeLatest(updateComment.type, handleUpdateComment);
}