// app/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth";
import { encryptTransform } from "../utils/functions/encryptTransform";

// Configure persist
const persistConfig = {
  key: "dine-savvy",
  storage,
  blacklist: [], // Add slices you don't want to persist here
  transforms: [encryptTransform], // Apply the encryption transform
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
