import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, delay, EMPTY, map, mergeMap, of, retryWhen, take, tap, throwError, withLatestFrom} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {TokensType} from "../../../core/types/tokens.type";
import {select, Store} from "@ngrx/store";
import {selectRefreshToken} from "./auth.selectors";
import { AuthActions } from ".";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(( result: TokensType ) => AuthActions.loginSuccess({ access_token:result.access_token, refresh_token: result.refresh_token })),
          catchError((error) =>  of(AuthActions.loginFailure({error: error.error.message})))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        // Redirect the user after a successful login
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false } // Since we're not dispatching any new action
  );
  refreshAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshAccessToken),
      mergeMap(() =>
        this.authService.refreshAccessToken().pipe(
          map((tokens) => AuthActions.refreshAccessTokenSuccess({ access_token: tokens.access_token })),
          catchError((error) => of(AuthActions.refreshAccessTokenFailure({ error: error.error.message })))
        )
      )
    )
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
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
              this.store.dispatch(AuthActions.logoutSuccess())
              this.authService.clearTokensFromLocalStorage();
              this.router.navigate(['/authentication/login']); // Redirect to the login page after logout
            }),
            catchError(() => {
              this.store.dispatch(AuthActions.logoutFailure())
              this.authService.clearTokensFromLocalStorage();
              this.router.navigate(['/authentication/login']);
              return EMPTY;
            })
          )),
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router, private authService: AuthService,private store:Store) {}
}
