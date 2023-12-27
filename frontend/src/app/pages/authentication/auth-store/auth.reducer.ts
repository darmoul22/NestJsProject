import { AuthActions } from ".";
import {AuthState} from "./auth.state";
import {createReducer, on} from "@ngrx/store";


export const initialAuthState: AuthState = {
  access_token: null,
  refresh_token: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { access_token, refresh_token }) => ({
    ...state,
    access_token,
    refresh_token,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    access_token: null,
    refresh_token: null,
    error,
  })),
  on(AuthActions.refreshAccessTokenSuccess, (state, { access_token }) => ({
    ...state,
    access_token,
    error: null,
  })),
  on(AuthActions.refreshAccessTokenFailure, (state, { error }) => ({
    ...state,
    access_token: null,
    refresh_token: null,
    error,
  })),
  on(AuthActions.logoutSuccess,AuthActions.loginFailure, () => initialAuthState),
);
