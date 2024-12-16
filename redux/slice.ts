import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";


interface Product {
  id: string;
  img: string | StaticImageData;
  title?: string;
  price?: number;
  discount?: number;
  quantity: number;
}

interface UserInfo {
  id: string | number;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface InitialState {
  products: Product[];
  userInfo: UserInfo | null; 
}

const initialState: InitialState = {
  products: [],
  userInfo: null, 
};


export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; 
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--; 
      } else if (item && item.quantity === 1) {
    
        state.products = state.products.filter((p) => p.id !== action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item) {
        item.quantity++; 
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item?.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { addToCart, deleteItem, increaseQuantity, decreaseQuantity, setUserInfo } = ProductsSlice.actions;
export default ProductsSlice.reducer;
