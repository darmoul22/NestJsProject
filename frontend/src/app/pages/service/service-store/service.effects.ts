import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import { ServiceActions } from ".";
import {catchError, concatMap, map, mergeMap, of, tap} from "rxjs";
import {ServicesService} from "../../../core/services/services.service";
import {ServiceModel} from "../../../core/models/service.model";

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
  updateService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.updateService),
      tap(() => this.store.dispatch(ServiceActions.loading())),
      concatMap((action) => {
        return this.services
          .updateService(action.service.id, action.service)
          .pipe(
            map((service: ServiceModel) =>ServiceActions.updateServiceSuccess({service})),
            catchError((error) => of(ServiceActions.updateServiceError({error: error.error.message})))
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
