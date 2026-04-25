import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getSellerProducts } from "../services/Product.api";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.products = action.payload;
        }
    },})


    export const { setSellerProducts } = productSlice.actions;
    export default productSlice.reducer;
    