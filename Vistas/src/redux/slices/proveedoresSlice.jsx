import {
  elimProveedores,
  listarProveedores,
  editProveedores,
  addProveedores,
} from "../actions/proveedoresActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proveedores: [],
  proveedor: {},
  loading: false,
  error: null,
};
const proveedoresSlice = createSlice({
  name: "Proveedores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //listar
      .addCase(listarProveedores.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarProveedores.fulfilled, (state, action) => {
        state.loading = false;
        state.proveedores = action.payload;
      })
      .addCase(listarProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //add
      .addCase(addProveedores.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProveedores.fulfilled, (state, action) => {
        state.loading = false;
        state.proveedor = action.payload;
      })
      .addCase(addProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //elim
      .addCase(elimProveedores.pending, (state) => {
        state.loading = true;
      })
      .addCase(elimProveedores.fulfilled, (state, action) => {
        state.loading = false;
        state.proveedor = action.payload;
      })
      .addCase(elimProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //edit
      .addCase(editProveedores.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProveedores.fulfilled, (state, action) => {
        const index = state.proveedores.findIndex(
          (proveedor) => proveedor.proveedorId === action.payload.proveedorId,
        );
        if (index !== -1) {
          state.proveedores[index] = action.payload;
        }
      })
      .addCase(editProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});
export const proveedoresReducer = proveedoresSlice.reducer;
