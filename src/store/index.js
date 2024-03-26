import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducer/user";
import profileReducer from "./reducer/profile";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  users: userReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
