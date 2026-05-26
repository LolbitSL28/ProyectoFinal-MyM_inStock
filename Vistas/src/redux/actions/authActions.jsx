import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../service/middleware";

export const actLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
