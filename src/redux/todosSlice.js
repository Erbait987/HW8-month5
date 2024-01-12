// todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
});

export const fetchTodosWithFetch = createAsyncThunk(
  "todos/fetchTodosWithFetch",
  async (_, thunkAPI) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
    return response.json();
  }
);

export const fetchTodosWithAuth = createAsyncThunk(
  "todos/fetchTodosWithAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://dummyjson.com/auth/todos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("Fetch Todos with Auth Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching todos with auth:", error);
      throw error;
    }
  }
);

export const createTodoWithAuth = createAsyncThunk(
  "todos/createTodoWithAuth",
  async (todo, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/todos/add",
        todo,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Create Todo with Auth Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating todo with auth:", error);
      throw error;
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    error: null,
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchTodosWithAuth.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items = action.payload.todos;
      })
      .addCase(createTodoWithAuth.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(createTodoWithAuth.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const todosReducer = todosSlice.reducer;
