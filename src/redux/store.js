import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthSlice";
import { todosReducer } from "./todosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});
