import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../service/middleware";

export const listarCategorias = createAsyncThunk(
  "categorias/listar",
  async (data, { isRejectedWithValue }) => {
    const response = await api.get("/categorias");
    return response.data;
  },
);

export const addCategorias = createAsyncThunk(
  "categorias/add",
  async (data, { isRejectedWithValue }) => {
    const response = await api.post("/categorias", data);
    return response.data;
  },
);
export const elimCategorias = createAsyncThunk(
  "categorias/elim",
  async (data, { isRejectedWithValue }) => {
    const response = await api.delete(`/categorias/${data}`);
    return response.data;
  },
);
export const editCategorias = createAsyncThunk(
  "categorias/edit",
  async ({ id, data }, { isRejectedWithValue }) => {
    const response = await api.put(`/categorias/${id}`, data);
    return response.data;
  },
);
