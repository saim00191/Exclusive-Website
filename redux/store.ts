import { configureStore } from "@reduxjs/toolkit";
import singleProductsReducer from './products'
import productReducer from "./slice";  
import wishListReducer from "./wishlistSlice";  

export const store = configureStore({
  reducer: {
    products: productReducer,
    wishList: wishListReducer,
    singleProducts: singleProductsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
