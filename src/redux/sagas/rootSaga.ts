import { all, fork } from "redux-saga/effects";
import * as commentSagas from "./handlers + watchers/comments";
import * as dishSagas from "./handlers + watchers/dishes";
import * as promotionSagas from "./handlers + watchers/promotions";
import * as leaderSagas from "./handlers + watchers/leaders";

export function* rootSaga() {
  yield all(
    [
      ...Object.values(commentSagas),
      ...Object.values(dishSagas),
      ...Object.values(promotionSagas),
      ...Object.values(leaderSagas),
    ].map(fork)
  );
}
