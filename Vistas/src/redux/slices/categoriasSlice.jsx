import {
  elimCategorias,
  listarCategorias,
  editCategorias,
  addCategorias,
} from "../actions/categoriasActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  categoria: {},
  loading: false,
  error: null,
};
const categoriasSlice = createSlice({
  name: "Categorias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //listar
      .addCase(listarCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(listarCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //add
      .addCase(addCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categoria = action.payload;
      })
      .addCase(addCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //elim
      .addCase(elimCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(elimCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categoria = action.payload;
      })
      .addCase(elimCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      //edit
      .addCase(editCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategorias.fulfilled, (state, action) => {
        const index = state.categorias.findIndex(
          (categoria) => categoria.categoriaId === action.payload.categoriaId,
        );
        if (index !== -1) {
          state.categorias[index] = action.payload;
        }
      })
      .addCase(editCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});
export const categoriasReducer = categoriasSlice.reducer;
