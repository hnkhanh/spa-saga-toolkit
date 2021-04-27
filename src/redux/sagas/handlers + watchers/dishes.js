import { call, put, takeLatest} from "redux-saga/effects";
import { dishesFailed, setDishes, getDishes } from "../../reducers/dishes";
import { Api } from "../api";


export function* handleGetDishes() {
  try {
    const { data } = yield call(Api.getRequest, 'dishes');
    //pass the payload into dispatch function
    if (data) yield put(setDishes( [...data] ))
  } catch (error) {
    console.log(error);
    let err = Api.handleRequestError(error)
    yield put(dishesFailed(err));
  }
}
export default function* fetchDishesWatcher() {
  yield takeLatest(getDishes.type, handleGetDishes);
}
