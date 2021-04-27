import { call, put, takeLatest} from "redux-saga/effects";
import { promotionsFailed, setPromotions, getPromotions } from "../../reducers/promotions";
import { getRequest } from "../api/index";

export function* handleGetPromotions(action) {
  try {
    const {data} = yield call(getRequest, 'promotions');
    // console.log(data)
    //pass the payload into dispatch function
    if (data) yield put(setPromotions( [...data] ))
    else {
      throw new Error('No results');
    }
  } catch (error) {
    console.log(error);
    yield put(promotionsFailed(error));
  }
}
export default function* fetchPromotionsWatcher() {
  yield takeLatest(getPromotions.type, handleGetPromotions);
}
