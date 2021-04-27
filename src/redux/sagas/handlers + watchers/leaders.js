import { call, put, takeLatest} from "redux-saga/effects";
import { leadersFailed, setLeaders, getLeaders } from "../../reducers/leaders";
import { getRequest } from "../api";

export function* handleGetLeaders(action) {
  try {
    const {data} = yield call(getRequest, 'leaders');
    // console.log(data)
    //pass the payload into dispatch function
    if (data) yield put(setLeaders( [...data] ))
    else {
      throw new Error('No results');
    }
  } catch (error) {
    console.log(error);
    yield put(leadersFailed(error));
  }
}
export default function* fetchLeadersWatcher() {
  yield takeLatest(getLeaders.type, handleGetLeaders);
}
