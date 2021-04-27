import { all, fork } from 'redux-saga/effects';
import fetchCommentsWatcher, { postCommentsWatcher, deleteCommentWatcher, updateCommentWatcher } from './handlers + watchers/comments';
import fetchDishesWatcher from './handlers + watchers/dishes';
import fetchLeadersWatcher from './handlers + watchers/leaders';
import fetchPromotionsWatcher from './handlers + watchers/promotions';


export function* rootSaga() {
  yield all([
    fork(fetchDishesWatcher),
    fork(fetchLeadersWatcher),
    fork(fetchCommentsWatcher),
    fork(fetchPromotionsWatcher),
    fork(postCommentsWatcher),
    fork(deleteCommentWatcher),
    fork(updateCommentWatcher)
  ])
}
