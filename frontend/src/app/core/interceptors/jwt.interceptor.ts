import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import { AuthSelectors } from "src/app/pages/authentication/auth-store";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('refresh')){
      this.store.pipe(select(AuthSelectors.selectAccessToken)).subscribe(
        (token) => {
          if (token) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          }
        }
      )
    }else {
      this.store.pipe(select(AuthSelectors.selectRefreshToken)).subscribe(
        (token) => {
          if (token) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          }
        }
      )
    }
    return next.handle(req);
  }

}
