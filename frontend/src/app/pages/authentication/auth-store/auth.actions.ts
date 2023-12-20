import {createAction, props} from "@ngrx/store";
import {LoginFormType} from "../../../core/types/login-form.type";

export const login = createAction('[Auth] Login', props<{ credentials: LoginFormType }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ access_token: string; refresh_token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const refreshAccessToken = createAction('[Auth] Refresh Access Token');
export const refreshAccessTokenSuccess = createAction('[Auth] Refresh Access Token Success', props<{ access_token: string }>());
export const refreshAccessTokenFailure = createAction('[Auth] Refresh Access Token Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');

