import { configureStore } from "@reduxjs/toolkit";
import session from "../helpers/reducers/session";

export default configureStore({
  reducer: {
    session: session,
  },
});
