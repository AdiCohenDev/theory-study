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
}

export const initialState: AuthState = {
  confirmation: null!,
  user: null!,
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
      };
    },
  },
});

export const { setConfirmationResult, setUser } = authSlice.actions;
export default authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
export const selectIsAuth = (state: any) => !!state?.auth?.user;
