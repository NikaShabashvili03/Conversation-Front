import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, fetchProfile, logout, register } from '../../api/auth';
import { SafeUser } from '../../types';


interface AuthState {
  user: SafeUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  success: null
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login({
        email: email,
        password: password
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, firstname, lastname }: { email: string, password: string, firstname: string, lastname: string }, { rejectWithValue }) => {
    try {
      const response = await register({
        email: email,
        password: password,
        lastname: lastname,
        firstname: firstname
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async () => {
  const response = await fetchProfile();
  return response;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.success = null;
    },
    clearSucces: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.status = 'failed'
        state.success = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'succeeded';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearError, clearSucces } = authSlice.actions;

export default authSlice.reducer;
