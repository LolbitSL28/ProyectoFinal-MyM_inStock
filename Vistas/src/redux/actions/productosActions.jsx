import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../service/middleware";

export const listarProductos = createAsyncThunk(
  "productos/listar",
  async (data, { isRejectedWithValue }) => {
    const response = await api.get("/productos");
    return response.data;
  },
);

export const addProductos = createAsyncThunk(
  "productos/add",
  async (data, { isRejectedWithValue }) => {
    const response = await api.post("/productos", data);
    return response.data;
  },
);
export const elimProductos = createAsyncThunk(
  "productos/elim",
  async (data, { isRejectedWithValue }) => {
    const response = await api.delete(`/productos/${data}`);
    return response.data;
  },
);
export const editProductos = createAsyncThunk(
  "productos/edit",
  async ({ id, data }, { isRejectedWithValue }) => {
    const response = await api.put(`/productos/${id}`, data);
    return response.data;
  },
);
