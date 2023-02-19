import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    task: tasksReducer,
  },
});
export default store;
