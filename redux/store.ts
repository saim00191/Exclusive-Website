import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import singleProductsReducer from './products';
import productReducer from "./slice";
import wishListReducer from "./wishlistSlice";
import  AdminSlice  from "./adminSlice";

const rootReducer = combineReducers({
  products: productReducer,
  wishList: wishListReducer,
  singleProducts: singleProductsReducer,
  adminSlice : AdminSlice
});


const persistConfig = {
  key: "root", 
  storage, 
  whitelist: ["products", "wishList", "singleProducts","adminSlice"], 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], 
      },
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;