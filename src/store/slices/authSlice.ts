import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserDoc } from "@/types/types";
import type { Models } from "appwrite";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  getUserDataThunk,
} from "@/store/thunks/authThunk";

interface AuthState {
  user: User | null;
  accountUser: Models.User<Models.Preferences> | null;
  userData: UserDoc | null;
  isAuthenticated: boolean;
  loadingType: "user" | "signup" | "login" | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accountUser: null,
  userData: null,
  isAuthenticated: false,
  loadingType: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAccountUser: (state, action: PayloadAction<Models.User<Models.Preferences> | null>) => {
      state.accountUser = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      state.accountUser = null;
      state.userData = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register user cases
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loadingType = "signup";
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loadingType = null;
        if (action.payload) {
          state.user = action.payload.user;
          state.userData = action.payload.userDoc;
          state.isAuthenticated = true;
        }
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload as string;
      });

    // Login user cases
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loadingType = "login";
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loadingType = null;
        if (action.payload) {
          state.user = action.payload.user;
          state.userData = action.payload.userDoc;
          state.isAuthenticated = true;
        }
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload as string;
      });

    // Logout user cases
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.loadingType = "user";
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loadingType = null;
        state.user = null;
        state.accountUser = null;
        state.userData = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload as string;
      });

    // Get user data cases
    builder
      .addCase(getUserDataThunk.pending, (state) => {
        state.loadingType = "user";
        state.error = null;
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.loadingType = null;
        if (action.payload) {
          state.userData = action.payload.userDoc;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.userData = null;
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.loadingType = null;
        state.user = null;
        state.userData = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, setAccountUser, resetAuth } = authSlice.actions;
export default authSlice.reducer;
