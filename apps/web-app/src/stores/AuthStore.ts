import { createSlice } from '@reduxjs/toolkit';
import { UserCredential } from '@firebase/auth/dist/node-esm';
import { RootState } from './Store';

interface IConfirmationResult {
  readonly verificationId: string;

  confirm(verificationCode: string | undefined): Promise<UserCredential>;
}

interface IUser {
  displayName?: string;
  phoneNumber?: string;
  uid: string;
}
export interface IAuthState {
  confirmation: IConfirmationResult;
  user: IUser;
  isLoading: boolean;
}

export const initialState: IAuthState = {
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
