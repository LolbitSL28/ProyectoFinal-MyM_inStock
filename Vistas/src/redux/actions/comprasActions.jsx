import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/middleware";

export const listarCompras = createAsyncThunk("compras/listar", async () => {
  const response = await api.get("/compras");
  return response.data;
});

export const addCompra = createAsyncThunk("compras/add", async (data) => {
  const response = await api.post("/compras", data);
  return response.data;
});

export const listarCompraId = createAsyncThunk(
  "compras/listarId",
  async (id) => {
    const response = await api.get(`/compras/${id}`);
    return response.data;
  },
);
