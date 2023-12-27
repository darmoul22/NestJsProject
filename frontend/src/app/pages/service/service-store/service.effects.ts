import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import { ServiceActions } from ".";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {ServicesService} from "../../../core/services/services.service";

@Injectable()
export class ServiceEffects {
    pageEnter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.pageEnter),
      tap(() => this.store.dispatch(ServiceActions.loading())),
      mergeMap(() => {
        return this.services
          .getAllServices()
          .pipe(
            map((services) => ServiceActions.loadSuccess({services})),
            catchError((error) => of(ServiceActions.loadError({error: error.error.message})))
          )
      })
    )
    )


  constructor(
    private actions$: Actions,
    private router: Router,
    private services: ServicesService,
    private store:Store
  ) {}
}
