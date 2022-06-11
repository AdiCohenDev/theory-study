import { createSlice } from '@reduxjs/toolkit';
import { UserCredential } from '@firebase/auth/dist/node-esm';
import { RootState } from './store';

interface ConfirmationResult {
  readonly verificationId: string;

  confirm(verificationCode: string | undefined): Promise<UserCredential>;
}

export interface AuthState {
  confirmation: ConfirmationResult;
  user: object;
  isLoading: boolean;
}

export const initialState: AuthState = {
  confirmation: null!,
  user: null!,
  isLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setConfirmationResult(state, action) {
      state.confirmation = action.payload;
    },
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { setConfirmationResult, setUser } = authSlice.actions;
export default authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
export const selectIsAuth = (state: RootState) => !!state?.auth?.user;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
