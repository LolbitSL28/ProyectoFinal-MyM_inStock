import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../service/middleware";

export const listarProveedores = createAsyncThunk(
  "proveedores/listar",
  async (data, { isRejectedWithValue }) => {
    const response = await api.get("/proveedores");
    return response.data;
  },
);

export const addProveedores = createAsyncThunk(
  "proveedores/add",
  async (data, { isRejectedWithValue }) => {
    const response = await api.post("/proveedores", data);
    return response.data;
  },
);
export const elimProveedores = createAsyncThunk(
  "proveedores/elim",
  async (data, { isRejectedWithValue }) => {
    const response = await api.delete(`/proveedores/${data}`);
    return response.data;
  },
);
export const editProveedores = createAsyncThunk(
  "proveedores/edit",
  async ({ id, data }, { isRejectedWithValue }) => {
    const response = await api.put(`/proveedores/${id}`, data);
    return response.data;
  },
);
