import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { logOut, login } from '../services/auth/usecases';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  isAuthenticated: !!JSON.parse(sessionStorage.getItem('user')),
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      login.endpoints.login.matchFulfilled,
      (state, { payload: { access } }) => {
        const data = jwtDecode(access);
        state.user = {
          user_id: data.user_id,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email
        }
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(logOut.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { logIn, logout } = userSlice.actions;

export const auth_state = (state) => state[userSlice.name];

export default userSlice.reducer;