import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const { data } = await axios.get("/api/products");
    return data;
});

// Add a new product
export const addProduct = createAsyncThunk("products/addProduct", async (productData, { getState }) => {
    const { user } = getState().auth;
    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    };
    const { data } = await axios.post("/api/products", productData, config);
    return data;
});

// Edit a product
export const editProduct = createAsyncThunk("products/editProduct", async ({ id, updatedData }, { getState }) => {
    const { user } = getState().auth;
    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    };
    await axios.put(`/api/products/${id}`, updatedData, config);
    return { id, updatedData };
});

// Delete a product
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { getState }) => {
    const { user } = getState().auth;
    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    };
    await axios.delete(`/api/products/${id}`, config);
    return id;
});

const productSlice = createSlice({
    name: "products",
    initialState: { products: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = "succeeded";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload.id);
                if (index !== -1) state.products[index] = { ...state.products[index], ...action.payload.updatedData };
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            });
    }
});

export default productSlice.reducer;
