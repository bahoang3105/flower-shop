import { createSlice } from '@reduxjs/toolkit';

export interface Authentication {
  authenticationToken: string;
}

const initialState: Authentication = {
  authenticationToken: '',
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleLogin: (state: Authentication, action: any) => {
      const { token } = action.payload;
      return {
        ...state,
        authenticationToken: token,
      };
    },
  },
});

export const { handleLogin } = AuthenticationSlice.actions;

export const namespace = 'AuthenticationSlice';

export default AuthenticationSlice.reducer;
