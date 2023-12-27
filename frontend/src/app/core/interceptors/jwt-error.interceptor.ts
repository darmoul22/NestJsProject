import {select, Store} from "@ngrx/store";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, of, switchMap, tap, throwError, withLatestFrom} from "rxjs";
import {AuthActions, AuthSelectors } from "src/app/pages/authentication/auth-store";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error && error.error.message === 'Invalid or expired token') {
          // Access token expired, attempt to refresh it
          return this.tryRefreshAccessToken(req, next);
        }

        return throwError(error);
      })
    );
  }

  private tryRefreshAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(AuthSelectors.selectAccessToken),
      withLatestFrom(this.store.pipe(select(AuthSelectors.selectRefreshToken))),
      switchMap(([accessToken, refreshToken]) => this.handleRefreshTokens(accessToken, refreshToken)),
      switchMap(() => this.retryRequestWithNewToken(request, next)),
      catchError((error) => this.handleRefreshFailure(error))
    );
  }
  private handleRefreshTokens(accessToken: string | null, refreshToken: string | null): Observable<void> {
    if (accessToken && refreshToken) {
      // Dispatch the refresh action using the current refresh token from the store
      this.store.dispatch(AuthActions.refreshAccessToken());
      // Return an observable that completes immediately (or use of(EMPTY))
      return EMPTY;
    } else {
      // Handle the case where either access token or refresh token is missing
      this.store.dispatch(AuthActions.refreshAccessTokenFailure({ error: 'Missing access or refresh token' }));
      return throwError('Missing access or refresh token');
    }
  }
  private handleRefreshFailure(error: any): Observable<never> {
    // Handle refresh failure, for example, dispatch an action to indicate refresh failure
    this.store.dispatch(AuthActions.refreshAccessTokenFailure({ error: 'Failed to refresh access token' }));
    return throwError(error);
  }
  private retryRequestWithNewToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(AuthSelectors.selectAccessToken), // Replace 'selectNewAccessToken' with your actual selector
      switchMap((newAccessToken: string | null) => {
        if (newAccessToken) {
          // Use the new access token to clone the request with the updated authorization header
          const newRequest = this.addAuthorizationHeader(request, newAccessToken);
          return next.handle(newRequest);
        } else {
          // Handle the case where the new access token is missing
          return throwError('Missing new access token');
        }
      }),
      catchError((error) => this.handleRefreshFailure(error))
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    // Clone the request and add the new authorization header
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

}


