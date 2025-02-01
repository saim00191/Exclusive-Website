import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface ProductsTypes {
  id: string,
  title: string,
  oldPrice?: number,
  newPrice?: number,
  star?: number,
  description?: string,
  image: string | StaticImageData,
  discount?: number,
  reviews?: number,
  quantity: number

}

interface InitialState {
  Product: ProductsTypes[];
}

const initialState: InitialState = {
  Product: [],
};

export const Products = createSlice({
  name: "Products",
  initialState,
  reducers: {
    addToSingleProduct: (state, action: PayloadAction<ProductsTypes>) => {
      if (state.Product.length > 0) {
        state.Product = [];
      }
      
      state.Product.push({ ...action.payload, quantity: 1 });
    },
    
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.Product.find((p) => p.id === action.payload);
      if (item) {
        item.quantity++; 
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const item = state.Product.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--; 
      } else if (item && item.quantity === 1) {
        state.Product = state.Product.filter((p) => p.id !== action.payload);
      }
    },
  },
});

export const { deleteItem, addToSingleProduct ,increaseQuantity } =
  Products.actions;
export default Products.reducer;
