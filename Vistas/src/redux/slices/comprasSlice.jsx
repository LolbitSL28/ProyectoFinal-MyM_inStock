import {
  listarCompras,
  addCompra,
  listarCompraId,
} from "../actions/comprasActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compras: [],
  compra: {},
  loading: false,
  error: null,
};

const comprasSlice = createSlice({
  name: "Compras",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //listar
      .addCase(listarCompras.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarCompras.fulfilled, (state, action) => {
        state.loading = false;
        state.compras = action.payload;
      })
      .addCase(listarCompras.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //add
      .addCase(addCompra.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCompra.fulfilled, (state, action) => {
        state.loading = false;
        state.compra = action.payload;
      })
      .addCase(addCompra.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //listarId
      .addCase(listarCompraId.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarCompraId.fulfilled, (state, action) => {
        state.loading = false;
        state.compra = action.payload;
      })
      .addCase(listarCompraId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const comprasReducer = comprasSlice.reducer;
