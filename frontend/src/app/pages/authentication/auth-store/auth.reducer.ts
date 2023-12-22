import {AuthState} from "./auth.state";
import {createReducer, on} from "@ngrx/store";
import {
  initializeTokensFromLocalStorageSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout, logoutSuccess,
  refreshAccessTokenFailure,
  refreshAccessTokenSuccess
} from "./auth.actions";

export const initialAuthState: AuthState = {
  access_token: null,
  refresh_token: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { access_token, refresh_token }) => ({
    ...state,
    access_token,
    refresh_token,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    access_token: null,
    refresh_token: null,
    error,
  })),
  on(refreshAccessTokenSuccess, (state, { access_token }) => ({
    ...state,
    access_token,
    error: null,
  })),
  on(refreshAccessTokenFailure, (state, { error }) => ({
    ...state,
    access_token: null,
    refresh_token: null,
    error,
  })),
  on(logoutSuccess,loginFailure, () => initialAuthState),
  on(initializeTokensFromLocalStorageSuccess, (state, { access_token, refresh_token }) => ({
    ...state,
    access_token,
    refresh_token,
    error: null,
  })),

);
