import { getMe } from "@/services/UserService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async () => {
    try {
      const {data} = await getMe();
      return data;
    } catch (error) {
      return error;
    }
  }
);