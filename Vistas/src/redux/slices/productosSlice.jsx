import {
  elimProductos,
  listarProductos,
  editProductos,
  addProductos,
} from "../actions/productosActions";
import { createSlice } from "@reduxjs/toolkit";
import { listarCategorias } from "../actions/categoriasActions";
import { listarProveedores } from "../actions/proveedoresActions";

const initialState = {
  productos: [],
  producto: {},
  categorias: [],
  proveedores: [],
  loading: false,
  error: null,
};
const productosSlice = createSlice({
  name: "Productos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //listar
      .addCase(listarProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(listarProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //add
      .addCase(addProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.producto = action.payload;
      })
      .addCase(addProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //elim
      .addCase(elimProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(elimProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.producto = action.payload;
      })
      .addCase(elimProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //edit
      .addCase(editProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProductos.fulfilled, (state, action) => {
        const index = state.productos.findIndex(
          (producto) => producto.productId === action.payload.productId,
        );
        if (index !== -1) {
          state.productos[index] = action.payload;
        }
      })
      .addCase(editProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(listarCategorias.fulfilled, (state, action) => {
        state.categorias = action.payload;
      })
      .addCase(listarProveedores.fulfilled, (state, action) => {
        state.proveedores = action.payload;
      });
  },
});
export const productosReducer = productosSlice.reducer;
