import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import cartSlice from "./features/cartSlice";
import notificationSlice from "./features/notificationSlice";
import storage from "./storage";

const persistOptions = {
  key: "cart",
  storage,
};

const persistNotificationOptions = {
  key: "notification",
  storage,
};

const persistedCart = persistReducer(persistOptions, cartSlice);
const persistedNotification = persistReducer(
  persistNotificationOptions,
  notificationSlice
);

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistedCart,
      notification: persistedNotification,
    },
    middleware: (getDefaultMiddlewares: any) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
