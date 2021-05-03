import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createForms } from "react-redux-form";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { InitialFeedback } from "../forms";
import commentsReducer from "../reducers/comments";
import dishesReducer from "../reducers/dishes";
import leadersReducer from "../reducers/leaders";
import promotionsReducer from "../reducers/promotions";
import { rootSaga } from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  dishes: dishesReducer,
  leaders: leadersReducer,
  comments: commentsReducer,
  promotions: promotionsReducer,
  ...createForms({
    feedback: InitialFeedback,
  }),
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

// configure redux store
// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             dishes: Dishes,
//             comments: Comments,
//             promotions: Promotions,
//             leaders: Leaders,
//             ...createForms({
//                 feedback: InitialFeedback
//             }),
//         }),
//         applyMiddleware(thunk, logger),
//     );
//     return store;
// }
