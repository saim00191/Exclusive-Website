import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";


interface WishList {
  id: string;
  img: string | StaticImageData;
  title?: string;
  price?: number;
  discount?: number
  quantity : number;
  previousPrice?: number;
}

interface InitialState {
  WishList: WishList[];
  userInfo: any[]; 
}


const initialState: InitialState = {
  WishList: [],
  userInfo: [],
};

export const WishListWishList = createSlice({
  name: "WishList",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<WishList>) => {
      const item = state.WishList.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; 
      } else {
        state.WishList.push({ ...action.payload, quantity: 1 });
      }
    },
    addToWishlist: (state, action: PayloadAction<WishList>) => {
      const item = state.WishList.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; 
      } else {
        state.WishList.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<{ id: string }>) => {
    
      const itemIndex = state.WishList.findIndex((item) => item.id === action.payload.id);
      
      if (itemIndex !== -1) {
        state.WishList.splice(itemIndex, 1); 
      }
    },
    
    deleteItem: (state, action: PayloadAction<string>) => {
      const item = state.WishList.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--; 
      } else if (item && item.quantity === 1) {
        state.WishList = state.WishList.filter((p) => p.id !== action.payload);
      }
    },

  },
});

export const {  deleteItem ,addToWishlist , removeFromWishlist} = WishListWishList.actions;
export default WishListWishList.reducer;
