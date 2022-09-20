import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authSlice } from "./reducer/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});
setupListeners(store.dispatch);
export default store;