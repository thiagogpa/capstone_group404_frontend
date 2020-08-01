import { createStore } from "redux";
import { persistStore, persistReducer, purgeStoredState } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import rootReducer from "./redux/";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

store.subscribe(() => {
  console.log("Store changed ", store.getState());
});

export const persistor = persistStore(store);
