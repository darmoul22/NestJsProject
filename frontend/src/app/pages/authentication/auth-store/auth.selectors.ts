import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Access specific pieces of state using createSelector

// Select the access token
export const selectAccessToken = createSelector(selectAuthState, (state) => state.access_token);

// Select the refresh token
export const selectRefreshToken = createSelector(selectAuthState, (state) => state.refresh_token);

// Select the error message
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
