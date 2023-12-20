import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./app.state";
import {authReducer} from "../pages/authentication/auth-store/auth.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,

};
