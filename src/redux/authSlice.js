import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const resp = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });
    return resp.data;
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  const resp = await axios.post("https://dummyjson.com/auth/logout");
  return resp.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
      console.log(action.error);
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    });
  },
});

export const authReducer = authSlice.reducer;
