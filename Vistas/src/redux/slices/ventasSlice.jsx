import {
  listarVentas,
  addVenta,
  listarVentaId,
} from "../actions/ventasActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ventas: [],
  venta: {},
  loading: false,
  error: null,
};

const ventasSlice = createSlice({
  name: "Ventas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //listar
      .addCase(listarVentas.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarVentas.fulfilled, (state, action) => {
        state.loading = false;
        state.ventas = action.payload;
      })
      .addCase(listarVentas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //add
      .addCase(addVenta.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVenta.fulfilled, (state, action) => {
        state.loading = false;
        state.venta = action.payload;
      })
      .addCase(addVenta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //listarId
      .addCase(listarVentaId.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarVentaId.fulfilled, (state, action) => {
        state.loading = false;
        state.venta = action.payload;
      })
      .addCase(listarVentaId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const ventasReducer = ventasSlice.reducer;
