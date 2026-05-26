import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/middleware";

export const listarVentas = createAsyncThunk("ventas/listar", async () => {
  const response = await api.get("/ventas");
  return response.data;
});

export const addVenta = createAsyncThunk("ventas/add", async (data) => {
  const response = await api.post("/ventas", data);
  return response.data;
});
export const listarVentaId = createAsyncThunk("ventas/listarId", async (id) => {
  const response = await api.get(`/ventas/${id}`);
  return response.data;
});
