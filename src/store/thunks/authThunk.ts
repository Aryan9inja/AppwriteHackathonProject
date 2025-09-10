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
      
      // ✅ Check if userData is valid before proceeding
      if (!userData || !userData.user) {
        throw new Error("Failed to fetch user data after registration");
      }
      
      // ✅ Save to localStorage for persistence
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error: unknown) {
      const err = error as { message?: string };
      // ✅ Clear any partial data from localStorage on error
      localStorage.removeItem("userData");
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
      
      // ✅ Check if userData is valid before proceeding
      if (!userData || !userData.user) {
        throw new Error("Failed to fetch user data after login");
      }
      
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error: unknown) {
      const err = error as { message?: string };
      // ✅ Clear any partial data from localStorage on error
      localStorage.removeItem("userData");
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
      localStorage.removeItem("userData");
      return null;
    } catch (error: unknown) {
      const err = error as { message?: string };
      // ✅ Clear localStorage even on error to ensure clean state
      localStorage.removeItem("userData");
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
      return { user: state.auth.user, userDoc: state.auth.userData }; // Return existing data
    }
    try {
      const userData = await getUserData();
      
      // ✅ Check if userData is valid
      if (!userData || !userData.user) {
        throw new Error("No valid user data found");
      }
      
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error: unknown) {
      const err = error as { message?: string };
      // ✅ Clear localStorage on error
      localStorage.removeItem("userData");
      return rejectWithValue(err?.message || "Failed to fetch user");
    }
  }
);
