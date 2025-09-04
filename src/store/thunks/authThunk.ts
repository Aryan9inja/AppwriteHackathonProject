import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginFormData, SignUpFormData } from "@/types/types";
import {
  registerUser,
  loginUser,
  logout,
  getUserData,
} from "@/services/users.services";
import type { RootState } from "../store";

// Register user thunk
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (formData: SignUpFormData, { rejectWithValue }) => {
    try {
      await registerUser(formData);
      const userData = await getUserData();
      return userData;
    } catch (error: unknown) {
      const err = error as { message?: string };
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

// Login user thunk
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (formData: LoginFormData, { rejectWithValue }) => {
    try {
      await loginUser(formData);
      const userData = await getUserData();
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error: unknown) {
      const err = error as { message?: string };
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Logout user thunk
export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      localStorage.removeItem("userData")
      return null;
    } catch (error: unknown) {
      const err = error as { message?: string };
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

// Get user data thunk
export const getUserDataThunk = createAsyncThunk(
  "auth/getUserData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.auth.user) {
      return state.auth; // Skip if already loaded
    }
    try {
      const user = await getUserData();
      localStorage.setItem("userData", JSON.stringify(user));
      return user;
    } catch (error: unknown) {
      const err = error as { message?: string };
      return rejectWithValue(err?.message || "Failed to fetch user");
    }
  }
);
