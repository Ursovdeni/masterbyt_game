import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./reducers/usersRedusers";
import { pointsReducer } from "./reducers/pointsReducer";

export const store = configureStore({
  reducer: {
    usersReducer,
    pointsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
