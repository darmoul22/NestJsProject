import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  login,
  loginFailure,
  loginSuccess,
  logout, logoutFailure, logoutSuccess,
  refreshAccessToken,
  refreshAccessTokenFailure,
  refreshAccessTokenSuccess
} from "./auth.actions";
import {catchError, delay, EMPTY, map, mergeMap, of, retryWhen, take, tap, throwError, withLatestFrom} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {TokensType} from "../../../core/types/tokens.type";
import {select, Store} from "@ngrx/store";
import {selectRefreshToken} from "./auth.selectors";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(( result: TokensType ) => loginSuccess({ access_token:result.access_token, refresh_token: result.refresh_token })),
          catchError((error) => of(loginFailure({ error: 'Login failed' })))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        // Redirect the user after a successful login
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false } // Since we're not dispatching any new action
  );
  refreshAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshAccessToken),
      withLatestFrom(this.store.pipe(select(selectRefreshToken))), // Combine with the current refresh token from the store
      mergeMap(([action, refresh_token]) =>
        this.authService.refreshAccessToken(refresh_token).pipe(
          map((tokens) => refreshAccessTokenSuccess({ access_token: tokens.access_token })),
          catchError((error) => of(refreshAccessTokenFailure({ error: 'Failed to refresh access token' })))
        )
      )
    )
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        mergeMap(() => this.authService.logout()
          .pipe(
            retryWhen(errors =>
              errors.pipe(
                mergeMap((error, attempt) => {
                  // Retry only on specific errors (e.g., network-related errors)
                  if (attempt < 2 && (error.status !== 403 && error.status !== 401)) {
                    // Delay for 1 second before retrying (adjust as needed)
                    return of(error).pipe(delay(1000));
                  }
                  return throwError(error);
                }),
                take(3) // Retry up to 2 times (adjust as needed)
              )
            ),
            tap(() => {
              this.store.dispatch(logoutSuccess())
              this.authService.clearTokensFromLocalStorage();
              this.router.navigate(['/authentication/login']); // Redirect to the login page after logout
            }),
            catchError(() => {
              this.store.dispatch(logoutFailure())
              this.authService.clearTokensFromLocalStorage();
              this.router.navigate(['/authentication/login']);
              return EMPTY;
            })
          )),
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router, private authService: AuthService,private store:Store) {
    console.log('construct')
  }
}
