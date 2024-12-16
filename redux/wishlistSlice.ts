import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

// Define types
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
  userInfo: any[]; // Define this based on your user structure
}

// Initial state
const initialState: InitialState = {
  WishList: [],
  userInfo: [],
};

// Create slice
export const WishListWishList = createSlice({
  name: "WishList",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<WishList>) => {
      const item = state.WishList.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increase quantity if item already in cart
      } else {
        // Add item with default quantity 1 if not present
        state.WishList.push({ ...action.payload, quantity: 1 });
      }
    },
    addToWishlist: (state, action: PayloadAction<WishList>) => {
      const item = state.WishList.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increase quantity if item already in cart
      } else {
        // Add item with default quantity 1 if not present
        state.WishList.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<{ id: string }>) => {
      // Find the index of the item to be removed
      const itemIndex = state.WishList.findIndex((item) => item.id === action.payload.id);
      
      // If item exists, remove it from the list
      if (itemIndex !== -1) {
        state.WishList.splice(itemIndex, 1); // Removes the item at the found index
      }
    },
    
    deleteItem: (state, action: PayloadAction<string>) => {
      const item = state.WishList.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--; // Decrease quantity if greater than 1
      } else if (item && item.quantity === 1) {
        // Optionally remove the item from the cart if the quantity is 1
        state.WishList = state.WishList.filter((p) => p.id !== action.payload);
      }
    },

  },
});

// Export actions and reducer
export const {  deleteItem ,addToWishlist , removeFromWishlist} = WishListWishList.actions;
export default WishListWishList.reducer;
