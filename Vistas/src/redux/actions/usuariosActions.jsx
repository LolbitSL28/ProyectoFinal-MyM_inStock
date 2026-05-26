import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../service/middleware";

export const listarUsuarios = createAsyncThunk(
  "usuarios/listar",
  async (data, { isRejectedWithValue }) => {
    const response = await api.get("/usuarios");
    return response.data;
  },
);

export const addUsuarios = createAsyncThunk(
  "usuarios/add",
  async (data, { isRejectedWithValue }) => {
    const response = await api.post("/usuarios", data);
    return response.data;
  },
);
export const elimUsuarios = createAsyncThunk(
  "usuarios/elim",
  async (data, { isRejectedWithValue }) => {
    const response = await api.delete(`/usuarios/${data}`);
    return response.data;
  },
);
export const editUsuarios = createAsyncThunk(
  "usuarios/edit",
  async ({ id, data }, { isRejectedWithValue }) => {
    const response = await api.put(`/usuarios/${id}`, data);
    return response.data;
  },
);
